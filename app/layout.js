import "./globals.css";
import { Poppins } from "next/font/google";
import ClientLayout from "./ClientLayout";
import ChatWidget from "./components/ChatWidget";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
export const metadata = {
  // title: "AYCARGO",
  description: "Seamless Shipping Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      {/* <ClientLayout /> */}
      <body className={poppins.className}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
