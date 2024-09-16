"use client";
import { useState, useEffect } from "react";
import { IoClipboardOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

export default function HotTopics() {
  const [topics, setTopics] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getTopics = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/questions/latest/",
          {
            headers: {
              "Accept-Language": i18n.language === 'uz-Cyrl' ? "uz-cyr" : i18n.language,
            },
          }
        );
        const json = await response.json();
        setTopics(json);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    getTopics();
  }, []);
  return (
    <main className="my-3 lg:my-5">
      <header className="border-b-4 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">
          {t("trendingTopics")}
        </h1>
      </header>
      <main className="rounded-lg flex flex-col gap-2 mt-6">
        {topics.map(({ id, title }) => {
          return (
            <main
              key={id}
              className="rounded-lg bg-white border-b-4 my-1 border-[#1f9065]"
            >
              <Link
                href={`/question-details/${slugify(title)}/${id}`}
                className="flex justify-between p-3 lg:p-5"
              >
                <div className="flex items-center gap-1">
                  <IoClipboardOutline className="text-[#1f9065] font-bold" />
                  <p>{title}</p>
                </div>
                <MdOutlineArrowOutward className="text-[#1f9065] font-bold" />
              </Link>
            </main>
          );
        })}
      </main>
      <Link
        href="/categories"
        className="w-fit border border-[#1f9065] p-2 mt-3 rounded-full flex items-center gap-1"
      >
        {t("allQuestion")} <MdOutlineArrowOutward className="text-[#1f9065]" />
      </Link>
    </main>
  );
}
