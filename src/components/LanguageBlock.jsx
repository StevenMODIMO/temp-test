"use client";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { useRouter } from "next/navigation"

export default function LanguageBlock() {
  const { i18n } = useTranslation();
  const router = useRouter()

  const changeLanguage = (lang) => {
    if (i18nConfig.locales.includes(lang)) {
      i18n.changeLanguage(lang);
    }
  };
  return (
    <main className="flex gap-2">
      <button
        onClick={() => changeLanguage("uz")}
        className={
          i18n.language === "uz"
            ? "bg-[#40aa81] p-2 rounded-l-md"
            : "p-2 rounded-l-md"
        }
      >
        UZ
      </button>
      <button
        onClick={() => changeLanguage("uz-Cyrl")}
        className={
          i18n.language === "uz-Cyrl"
            ? "bg-[#40aa81] p-2 rounded-r-md"
            : "p-2 rounded-r-md"
        }
      >
        UZ-CY
      </button>
    </main>
  );
}
