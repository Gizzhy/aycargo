"use client";

import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignaturePad from "react-signature-canvas";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import styles from "./disclosure.module.scss";
import dynamic from 'next/dynamic';


// import logo from "../../assets/images/logo.svg";
// import Image from "next/image";

const Page = () => {
  const sigPadRef = useRef();
  const SignaturePad = dynamic(() => import('react-signature-canvas'), {
    ssr: false,
  });
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    pickupAddress: "",
    deliveryAddress: "",
    cargoType: "",
    weight: "",
    items: "",
    value: "",
    packaging: "",
  });

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4
    // shift text position down below the logo

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();

    let y = height - 50;

    const logoUrl = "/logo.png"; // path from public folder
    const logoImageBytes = await fetch(logoUrl).then((res) =>
      res.arrayBuffer()
    );
    const logoImage = await pdfDoc.embedPng(logoImageBytes); // or embedJpg if JPG
    const logoDims = logoImage.scale(0.55); // Adjust scale as needed

    page.drawImage(logoImage, {
      x: 40, // horizontal position
      y: height - 50, // vertical position from top
      width: logoDims.width,
      height: logoDims.height,
    });

    y -= logoDims.height + 10;
    const drawText = (text, opts = {}) => {
      const {
        x = 50,
        y: customY,
        size = 12,
        color = rgb(0, 0, 0),
        font: customFont = font,
      } = opts;

      const drawY = customY ?? y;

      page.drawText(text, {
        x,
        y: drawY,
        size,
        font: customFont,
        color,
      });

      y = drawY - size - 4; // Update y for the next line (basic line height)
    };

    const wrapText = (text, maxWidth, font, size) => {
      const words = text.split(" ");
      const lines = [];
      let line = "";

      for (const word of words) {
        const testLine = line + word + " ";
        const testWidth = font.widthOfTextAtSize(testLine, size);
        if (testWidth > maxWidth) {
          lines.push(line.trim());
          line = word + " ";
        } else {
          line = testLine;
        }
      }

      if (line.trim()) lines.push(line.trim());
      return lines;
    };

    const drawWrappedText = (text, opts = {}) => {
      const {
        x = 50,
        maxWidth = width - x * 2,
        size = 12,
        color = rgb(0, 0, 0),
        lineHeight = size + 4,
      } = opts;

      const lines = wrapText(text, maxWidth, font, size);

      for (const line of lines) {
        page.drawText(line, { x, y, size, font, color });
        y -= lineHeight;

        if (y < 60) {
          page = pdfDoc.addPage([595, 842]);
          y = height - 50;
        }
      }
    };

    // Start writing PDF content
    drawText("Cargo Business Disclosure Form", {
      x: 150,
      size: 14,
      color: rgb(0.1, 0.1, 0.4),
    });

    drawText("1. CUSTOMER INFORMATION", {
      size: 12,
      color: rgb(0.2, 0.2, 0.5),
    });
    drawText(`Full Name: ${formData.fullName}`);
    drawText(`Phone Number: ${formData.phone}`);
    drawText(`Email: ${formData.email}`);
    drawText(`Pickup Address: ${formData.pickupAddress}`);
    drawText(`Delivery Address: ${formData.deliveryAddress}`);

    drawText("2. CARGO DETAILS", { size: 12, color: rgb(0.2, 0.2, 0.5) });
    drawText(`Type of Cargo: ${formData.cargoType}`);
    drawText(`Weight of Goods: ${formData.weight}`);
    drawText(`List of Items:`, { size: 12 });
    drawWrappedText(formData.items, {
      size: 9,
      lineHeight: 13,
    });

    drawText(`Value of Goods: ${formData.value}`);
    drawText(`Packaging Description: ${formData.packaging}`);

    drawText("3. TERMS AND CONDITIONS", {
      size: 12,
      color: rgb(0.2, 0.2, 0.5),
    });

    const terms = [
      {
        title: "Disclosure of Contents",
        body: "The customer affirms that the cargo contents are accurately described and do not contain any prohibited, illegal, or hazardous materials.",
      },
      {
        title: "Liability",
        body: "AYCARGO is not liable for loss, damage, or delay caused by force majeure, customs inspections, or improperly packaged goods. Liability for loss or damage is limited to the declared value unless additional insurance is purchased.",
      },
      {
        title: "Insurance",
        body: "Additional cargo insurance is available upon request at an extra cost. If declined, the customer accepts the risk associated with the shipment.",
      },
      {
        title: "Delivery Timeframes",
        body: "Estimated delivery times are not guaranteed. Delays may occur due to customs clearance, transportation, or other external factors.",
      },
      {
        title: "Compliance with Laws",
        body: "The customer confirms that all cargo complies with international shipping laws and regulations, including but not limited to customs documentation and export/import restrictions.",
      },
      {
        title: "Payment Terms",
        body: "Full payment is required before shipment unless otherwise agreed. All charges are non-refundable once services have been rendered.",
      },
    ];

    for (const { title, body } of terms) {
      drawText(`• ${title}`, { size: 10 });
      drawWrappedText(body, { size: 8, color: rgb(0.3, 0.3, 0.3) });
    }

    drawText("4. CUSTOMER DECLARATION", {
      size: 12,
      color: rgb(0.2, 0.2, 0.5),
    });

    const declaration =
      "I hereby confirm that the above information is accurate and complete. I agree to the terms and conditions listed above and authorize AYCARGO to handle the cargo described.";

    drawWrappedText(declaration, { size: 8 });

    drawText("Customer Signature:", { size: 10 });

    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      const signatureDataUrl = sigPadRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      const signatureBytes = await fetch(signatureDataUrl).then((res) =>
        res.arrayBuffer()
      );

      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      const pngDims = signatureImage.scale(0.5);

      page.drawImage(signatureImage, {
        x: 50,
        y: y - pngDims.height - 5,
        width: pngDims.width,
        height: pngDims.height,
      });

      y -= pngDims.height + 20;
    } else {
      drawText("[No signature provided]", {
        x: 50,
        y: y - 20,
        size: 10,
        color: rgb(1, 0, 0),
      });

      y -= 40;
    }

    drawText(`Date: ${formattedDate}`, { size: 10 });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "AYCARGO_Receipt.pdf");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Cargo Business Disclosure Form</h1>
        <form className={styles.form}>
          {[
            { label: "Full Name", name: "fullName", placeholder: "John Doe" },
            {
              label: "Phone Number",
              name: "phone",
              placeholder: "+440123456789",
            },
            {
              label: "Email Address",
              name: "email",
              placeholder: "hello@example.com",
            },
            {
              label: "Pickup Address",
              name: "pickupAddress",
              placeholder: "Bradford, BN1 HAG",
            },
            {
              label: "Delivery Address",
              name: "deliveryAddress",
              placeholder: "London, LN1 HYT",
            },
            {
              label: "Type of Cargo",
              name: "cargoType",
              placeholder: "Clothings",
            },
            { label: "Weight of Goods", name: "weight", placeholder: "25kg" },
            {
              label: "List of Items",
              name: "items",
              placeholder: "Shirt, gown...",
            },
            { label: "Value of Goods", name: "value", placeholder: "$200" },
            { label: "Packaging Description", name: "packaging" },
          ].map((field) => (
            <div className={styles.inputGroup} key={field.name}>
              <label>{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                className={styles.inputss}
                required
              />
            </div>
          ))}

          <div className={styles.signature}>
            <label>Signature</label>
            <SignaturePad
              ref={sigPadRef}
              canvasProps={{
                width: 500,
                height: 200,
                className: styles.signatureCanvas,
              }}
            />
            <button
              type="button"
              onClick={clearSignature}
              className={styles.clearBtn}
            >
              Clear Signature
            </button>
          </div>

          <button
            type="button"
            onClick={generatePDF}
            className={styles.submitBtn}
          >
            Generate PDF
          </button>
        </form>
        {/* Hidden styled container for PDF capture */}
        {/* <div
          id="pdf-content"
          style={{
            padding: "20px",
            width: "595px",
            background: "#fff",
            // position: "absolute",
            // top: "-9999px",
            // left: "-9999px",
          }}
          className={styles.pdfItsel}
        >
          <div className={styles.logoA}>
            <Image src={logo} alt="aycargo" />
          </div>
          <p>Cargo Business Disclosure Form</p>
          <div className={styles.pdfContent}>
            <p className={styles.headings}>1. CUSTOMER INFORMATION</p>
            <p className={styles.infoHeader}>Full Name</p>
            <input
              className={styles.pdfFields}
              value={formData.fullName}
              readOnly
            />
            <p className={styles.infoHeader}>Phone Number</p>
            <input
              className={styles.pdfFields}
              value={formData.phone}
              readOnly
            />
            <p className={styles.infoHeader}>Email</p>
            <input
              className={styles.pdfFields}
              value={formData.email}
              readOnly
            />
            <p className={styles.infoHeader}>Pickup Address</p>
            <input
              className={styles.pdfFields}
              value={formData.pickupAddress}
              readOnly
            />
            <p className={styles.infoHeader}>Delivery Address</p>
            <input
              className={styles.pdfFields}
              value={formData.deliveryAddress}
              readOnly
            />
            <p className={styles.headings}>2. CARGO DETAILS</p>
            <p className={styles.infoHeader}>Type of Cargo</p>
            <input
              className={styles.pdfFields}
              value={formData.cargoType}
              readOnly
            />
            <p className={styles.infoHeader}>Weight of Goods</p>
            <input
              className={styles.pdfFields}
              value={formData.weight}
              readOnly
            />
            <p className={styles.infoHeader}>List of Items</p>
            <textarea
              className={styles.pdfFieldss}
              value={formData.items}
              readOnly
              ref={itemsRef}
            />
            <p className={styles.infoHeader}>Value of Goods</p>
            <input
              className={styles.pdfFields}
              value={formData.value}
              readOnly
            />
            <p className={styles.infoHeader}>Packaging Description</p>
            <input
              className={styles.pdfFields}
              value={formData.packaging}
              readOnly
            />
            <p className={styles.headings}>3. TERMS AND CONDITIONS</p>
            <ul>
              <li className={styles.pdfThing}>Disclosure of Contents</li>
              <p className={styles.pdfThings}>
                The customer affirms that the cargo contents are accurately
                described and do not contain any prohibited, illegal, or
                hazardous materials.
              </p>
              <li className={styles.pdfThing}>Liability</li>
              <p className={styles.pdfThings}>
                AYCARGO is not liable for loss, damage, or delay caused by force
                majeure, customs inspections, or improperly packaged goods.
                Liability for loss or damage is limited to the declared value
                unless additional insurance is purchased.
              </p>
              <li className={styles.pdfThing}>Insurance</li>
              <p className={styles.pdfThings}>
                Additional cargo insurance is available upon request at an extra
                cost. If declined, the customer accepts the risk associated with
                the shipment.
              </p>
              <li className={styles.pdfThing}>Delivery Timeframes</li>
              <p className={styles.pdfThings}>
                Estimated delivery times are not guaranteed. Delays may occur
                due to customs clearance, transportation, or other external
                factors.
              </p>
              <li className={styles.pdfThing}>Compliance with Laws</li>
              <p className={styles.pdfThings}>
                The customer confirms that all cargo complies with international
                shipping laws and regulations, including but not limited to
                customs documentation and export/import restrictions.
              </p>
              <li className={styles.pdfThing}>Payment Terms</li>
              <p className={styles.pdfThings}>
                Full payment is required before shipment unless otherwise
                agreed. All charges are non-refundable once services have been
                rendered.
              </p>
            </ul>
            <p className={styles.headings}>4. CUSTOMER DECLARATION</p>
            <p className={styles.pdfThings}>
              I hereby confirm that the above information is accurate and
              complete. I agree to the terms and conditions listed above and
              authorize AYCARGO to handle the cargo described.
            </p>
            <p
              className={styles.pdfThing}
              style={{
                marginTop: "30px",
              }}
            >
              Customer Signature
            </p>
            <div id="signature-placeholder"></div>
            <p
              className={styles.pdfThing}
              style={{
                marginTop: "30px",
              }}
            >
              Date
            </p>
            <input
              value={formattedDate}
              className={styles.pdfFields}
              readOnly
            />
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Page;
