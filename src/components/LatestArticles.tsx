"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArticleTypes } from "@/types/ArticleTypes";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function LatestArticles() {
  const [articles, setArticles] = useState<ArticleTypes[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/last_articles/"
        );
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <main className="w-[50%]">
      <header className="border-b-2 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">Good articles</h1>
      </header>

      {articles.length > 0 && (
        <div>
          <div
          >
            {articles.map((article) => (
              <div key={article.slug}>
                <Link href={`/articles/${article.slug}`}>
                  <div>
                    <Image
                      src={article.image}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div>
                      <h2>{article.title}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handlePrev}
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={handleNext}
      >
        <IoIosArrowForward />
      </button>
    </main>
  );
}
