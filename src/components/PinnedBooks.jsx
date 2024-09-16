"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function PinnedBooks() {
  const [pinnedBooks, setPinnedBooks] = useState([]);
  const [current, setCurrent] = useState(0);
  const { t,i18n } = useTranslation();

  useEffect(() => {
    const getPinnedBooks = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/books/pinned/",
          {
            headers: {
              "Accept-Language": i18n.language === 'uz-Cyrl' ? "uz-cyr" : i18n.language,
            },
          }
        );
        const json = await response.json();
        setPinnedBooks(json.results);
      } catch (error) {
        console.log(error);
      }
    };
    getPinnedBooks();
  }, []);

  const next = () => {
    setCurrent((prev) => (prev === pinnedBooks.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? pinnedBooks.length - 1 : prevIndex - 1
    );
  };

  return (
    <main className="my-3 rounded-md cursor-pointer bg-[#1f9065] p-2">
      <header className="border-b border-[#1f9065]">
        <h1 className="font-bold text-lg text-white lg:text-2xl">
          {t("bookDescription")}
        </h1>
      </header>
      <section className="text-white flex flex-col gap-2 my-3">
        <main className="text-white flex flex-col gap-2 my-3">
          {pinnedBooks.length > 0 && (
            <>
              <img
                src={pinnedBooks[current].images[0]}
                alt={pinnedBooks[current].title}
                className="w-80 h-56 object-cover rounded transition duration-700 ease-in-out mx-auto lg:h-52"
              />
              <p className="text-sm md:text-xl">
                {pinnedBooks[current].preview_description}
              </p>
            </>
          )}
        </main>
        <footer className="flex gap-2 justify-end text-white">
          <IoIosArrowBack onClick={prev} />
          <IoIosArrowForward onClick={next} />
        </footer>
      </section>
    </main>
  );
}
