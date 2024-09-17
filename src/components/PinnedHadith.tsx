"use client";
import { useState, useEffect } from "react";
import NotFound from "./NotFound";
import { useTranslation } from "react-i18next";

// Define the structure of the hadith object
interface Hadith {
  title: string;
  preview_hadith: string;
}

export default function PinnedHadith() {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const { t,i18n } = useTranslation();

  useEffect(() => {
    const getHadith = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/hadiths/pinned/",
          {
            headers: {
              "Accept-Language": i18n.language === 'uz-Cyrl' ? "uz-cyr" : i18n.language,
            },
          }
        );
        const json: Hadith = await response.json();
        setHadith(json);
      } catch (error) {
        console.log(error);
      }
    };
    getHadith();
  }, []);

  return (
    <main className="my-3 lg:my-5 rounded-md ">
      <header className="border-b-4 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2 cursor-pointer hover:text-[#1f9065]">{t("pinnedHadith")}</h1>
      </header>
      <section className="p-4">
        <div className="font-semibold text-gray-800 text-2xl cursor-pointer hover:text-[#1f9065]">
          {hadith?.title}
        </div>
        <p className="text-gray-600">{hadith?.preview_hadith}</p>
      </section>
    </main>
  );
}
