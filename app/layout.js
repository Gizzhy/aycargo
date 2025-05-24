import "./globals.css";

export const metadata = {
  title: "AYCARGO",
  description: "Seamless Shipping Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
