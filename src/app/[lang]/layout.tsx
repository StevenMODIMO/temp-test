import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Fatvo markazi",
  description: "zbekiston musulmonlar idorasi fatvo markazi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthContextProvider>
        <html lang="en">
          <body>
            <Navbar />
            {children}
            <Footer />
          </body>
        </html>
      </AuthContextProvider>
  );
}
