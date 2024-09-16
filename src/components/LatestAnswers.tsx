"use client";
import { useState, useEffect } from "react";
import { LuArrowDownRight } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// Function to slugify the title
function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

export default function LatestAnswers() {
  const [answers, setAnswers] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const { t, i18n } = useTranslation(["home"]); // State to manage the expanded accordion

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/questions/?pageSize=12",
          {
            headers: {
              "Accept-Language": i18n.language,
            },
          }
        );
        const json = await response.json();
        setAnswers(json.results);
      } catch (error) {
        console.log(error);
      }
    };
    getAnswers();
  }, []);

  const toggleExpand = (id: any) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <main className="my-3 lg:my-5">
      <header className="border-b-4 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">
          {t("latestAnswers")}
        </h1>
      </header>
      <main className="flex flex-col gap-2 mt-6">
        {answers.map(({ id, title, truncated_answer }) => (
          <div
            key={id}
            className="rounded-lg bg-white border-b-4 my-1 border-[#1f9065]"
          >
            <button
              onClick={() => toggleExpand(id)}
              className="w-full flex justify-between items-center mx-3 p-3 lg:text-lg"
            >
              <div className="flex gap-3 items-center">
                <FaRegStar className="bg-[#1f9065] text-white rounded-md p-1 text-2xl font-bold" />
                <h2>{title}</h2>
              </div>
              <LuArrowDownRight className="text-[#1f9065] mr-5" />
            </button>
            {expandedId === id && (
              <div className="p-2">
                {truncated_answer}{" "}
                <Link
                  href={`/question-details/${slugify(title)}/${id}`}
                  className="text-[#1f9065]"
                >
                  Read more
                </Link>
              </div>
            )}
          </div>
        ))}
      </main>
    </main>
  );
}
