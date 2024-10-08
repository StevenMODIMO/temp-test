import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Oauth from "@/components/Oauth";
import { AuthContextProvider } from "@/context/AuthContext";
import { AuthProvider } from "@/components/SessionProvider";
import TranslationsProvider from "./TranslationsProvider";
import initTranslations from "../i18n";
import { dir } from "i18next";
import i18nConfig from "@/i18nConfig";

export const metadata: Metadata = {
  title: "Fatvo markazi",
  description: "zbekiston musulmonlar idorasi fatvo markazi",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  params: { lang: string };
}

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<RootLayoutProps & { children: React.ReactNode }>) {
  const { resources } = await initTranslations(lang, [
    "layout",
    "categories",
    "login",
    "media",
    "library",
    "registration",
    "searchDeeper",
    "home",
    "forgotPassword",
    "sendQuestion",
    "latestAnswers",
    "prayer",
  ]);

  return (
    <AuthContextProvider>
      <AuthProvider>
        <html lang={lang} dir={dir(lang)}>
          <TranslationsProvider
            namespaces={[
              "layout",
              "categories",
              "login",
              "media",
              "library",
              "registration",
              "searchDeeper",
              "home",
              "forgotPassword",
              "sendQuestion",
              "latestAnswers",
              "prayer",
            ]}
            locale={lang}
            resources={resources}
          >
            <body>
              <Oauth />
              <Navbar />
              {children}
              <Footer />
            </body>
          </TranslationsProvider>
        </html>
      </AuthProvider>
    </AuthContextProvider>
  );
}
