"use client";
import { useState, useEffect } from "react";
import NotFound from "./NotFound";

// Define the structure of the hadith object
interface Hadith {
  title: string;
  preview_hadith: string;
}

export default function PinnedHadith() {
  const [hadith, setHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    const getHadith = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/hadiths/pinned/"
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
    <main className="my-3 lg:my-5 rounded-md bg-white">
      <header className="border-b-4 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">Kun hadith</h1>
      </header>
      <section className="p-4">
        <div className="font-semibold text-gray-800 text-2xl">
          {hadith?.title}
        </div>
        <p className="text-gray-600">{hadith?.preview_hadith}</p>
      </section>
    </main>
  );
}
