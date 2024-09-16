"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [current, setCurrent] = useState(0);
  const { t,i18n  } = useTranslation();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/last_articles/", {
            headers: {
              "Accept-Language": i18n.language
            }
          }
        );
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.log(error);
      }
    };
    getArticles();
  }, []);

  const next = () => {
    setCurrent((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  return (
    <main className="my-3 w-fit lg:my-5">
      <header className="border-b-4 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">{t("latestArticles")}</h1>
      </header>
      <section>
        <div className="relative my-3">
          {articles.length > 0 && (
            <>
              <img
                src={articles[current].image}
                alt={articles[current].title}
                className="w-80 h-44 object-cover rounded-[32px] transition duration-700 ease-in-out lg:w-full lg:h-72"
              />
              <Link
                href={`/articles/${articles[current].slug}`}
                className="text-[#1f9065] text-3xl font-semibold p-2"
              >
                {articles[current].title}
              </Link>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                onClick={prev}
              >
                <MdOutlineArrowBackIosNew size={16} />
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
                onClick={next}
              >
                <MdArrowForwardIos size={16} />
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
