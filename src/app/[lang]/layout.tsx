import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Oauth from "@/components/Oauth";
import { AuthContextProvider } from "@/context/AuthContext";
import { AuthProvider } from "@/components/SessionProvider";

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
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            {children}
            <Footer />
          </body>
        </html>
      </AuthProvider>
    </AuthContextProvider>
  );
}
