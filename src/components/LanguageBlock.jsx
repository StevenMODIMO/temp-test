"use client";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const languages = [
  { code: "uz", label: "UZ" },
  { code: "uz-Cyrl", label: "УЗ" },
  // Add other languages if necessary
];

export default function LanguageBlock() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPath = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);

  // Handle language change
  const changeLanguage = (lang) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    
    // Set the NEXT_LOCALE cookie to persist the selected language
    document.cookie = `NEXT_LOCALE=${lang};expires=${date.toUTCString()};path=/`;

    // Change language in i18n and update the URL
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang); // Update selected language in state
    
    // Remove or replace existing language prefix in the current path
    const newPath = currentPath.replace(/^\/(uz|uz-Cyrl|en|ru)/, `/${lang}`);
    
    router.push(newPath); // Update the URL with the new language
    router.refresh(); // Ensure the page refreshes with the new locale
  };

  // UseEffect to check for existing language cookie on load
  useEffect(() => {
    const getCookie = (name) => {
      const nameEQ = name + "=";
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length);
        }
      }
      return null;
    };

    const cookieValue = getCookie('NEXT_LOCALE');
    if (cookieValue && cookieValue !== currentLocale) {
      i18n.changeLanguage(cookieValue); // Set the i18n language based on the cookie
      setSelectedLanguage(cookieValue); // Update state with the selected language
    }
  }, [i18n, currentLocale]);

  return (
    <ul className="flex items-center justify-center gap-2 text-gray-200 font-light rounded-2xl">
      {languages.map((lang) => (
        <li key={lang.code} className="cursor-pointer">
          <div
            onClick={() => changeLanguage(lang.code)}
            className={`p-2 rounded-md transition-all ${
              lang.code === selectedLanguage ? "bg-[#40aa81]" : ""
            }`}
          >
            {lang.label}
          </div>
        </li>
      ))}
    </ul>
  );
}
