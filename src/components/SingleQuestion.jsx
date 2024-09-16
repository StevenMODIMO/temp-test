"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SingleQuestion({ id }) {
  const [question, setQuestion] = useState({});
  const { t,i18n } = useTranslation(["categories"]);

  useEffect(() => {
    const getQuestion = async () => {
      const response = await fetch(
        `https://backfatvo.salyam.uz/api_v1/questions/${id}/`,
        {
          headers: {
            "Accept-Language": i18n.language === 'uz-Cyrl' ? "uz-cyr" : i18n.language,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setQuestion(json);
      } else {
        console.log(json.error);
      }
    };
    getQuestion();
  }, [id]);

  const formattedDate = question.updated_at
    ? new Date(question.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main className="border-b-4 border-[#1f9065] bg-white shadow-lg rounded-lg w-[80%] ml-6 p-6 flex flex-col gap-4 lg:w-[70%] lg:mx-auto">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[#1f9065] text-2xl font-semibold">
            {question.title}
          </p>
          <p className="text-gray-500 text-sm">
            {question.view} {t("views")}
          </p>
        </div>
      </header>
      <main>
        <section className="flex gap-4 p-4">
          <p className="text-lg text-gray-500">{question.question}</p>
        </section>
      </main>
      <div className="h-[2px] w-[95%] mx-auto bg-gray-200"></div>
      <main>
        <section className="flex gap-4 p-4">
          <div
            className="text-lg text-[#1f9065]"
            dangerouslySetInnerHTML={{ __html: question.answer }}
          />
        </section>
        <p>{formattedDate}</p>
      </main>
    </main>
  );
}
