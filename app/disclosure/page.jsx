"use client";

import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignaturePad from "react-signature-canvas";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styles from "./disclosure.module.scss";
import logo from "../../assets/images/logo.svg";
import Image from "next/image";

const Page = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const sigPadRef = useRef(null);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearSignature = () => sigPadRef.current.clear();

  const generatePDF = async () => {
    if (!sigPadRef.current || sigPadRef.current.isEmpty()) {
      alert("Please provide a signature before generating the PDF.");
      return;
    }

    setIsGenerating(true);

    try {
      const sigImageUrl = sigPadRef.current.toDataURL("image/png");

      const signaturePlaceholder = document.getElementById(
        "signature-placeholder"
      );
      if (signaturePlaceholder) {
        signaturePlaceholder.innerHTML = `<img src="${sigImageUrl}" style="width: 200px; border: 1px solid #000;" alt="Signature"/>`;
      }

      const pdfContainer = document.getElementById("pdf-content");
      const scale = window.innerWidth <= 768 ? 2 : 3;
      const canvas = await html2canvas(pdfContainer, {
        scale,
        useCORS: true,
      });

      //   const imgData = canvas.toDataURL("image/png");
      const imgData = canvas.toDataURL("image/jpeg", 0.6); // 0.6 = 60% quality

      const pdf = new jsPDF("p", "pt", "a4");
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );

      heightLeft -= pageHeight;

      // Additional pages
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      // const isIOS =
      //   /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      // const blob = pdf.output("blob");
      // const blobUrl = URL.createObjectURL(blob);

      // if (isIOS) {
      //   window.open(blobUrl, "_blank");
      // } else {
      //   const link = document.createElement("a");
      //   link.href = blobUrl;
      //   link.download = "Cargo_Disclosure_Form.pdf";
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // }

      // setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      // pdf.save("Cargo_Disclosure_Form.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Something went wrong while generating the PDF.");
    } finally {
      setIsGenerating(false);
    }
  };
  const handleDownloadOrOpen = () => {
    if (!pdfUrl) return;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
      // On iOS, open in a new tab synchronously on user gesture
      window.open(pdfUrl, "_blank");
      alert("PDF opened in new tab. Use the Share button to save or print.");
    } else {
      // On desktop and Android, trigger download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Cargo_Disclosure_Form.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
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
                placeholder={field.placeholder}
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
          {isGenerating && (
            <p className={styles.loading}>Generating PDF... Please waittt.</p>
          )}

          <button
            type="button"
            onClick={generatePDF}
            className={styles.submitBtn}
          >
            Generate PDF
          </button>
        </form>
        {/* Only show download/open button after PDF is ready */}
        {pdfUrl && (
          <button
            onClick={handleDownloadOrOpen}
            className={styles.downloadButton}
          >
            {/iPad|iPhone|iPod/.test(navigator.userAgent)
              ? "Open PDF"
              : "Download PDF"}
          </button>
        )}

        {/* Hidden styled container for PDF capture */}
        <div
          id="pdf-content"
          style={{
            padding: "20px",
            width: "595px",
            background: "#fff",
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
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
            <input
              className={styles.pdfFields}
              value={formData.items}
              readOnly
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
