"use client";
import { useState, useEffect } from "react";
import Image from "next/image";


export default function PinnedBooks() {
  const [pinnedBooks, setPinnedBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getPinnedBooks = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/books/pinned/"
        );
        const json = await response.json();
        setPinnedBooks(json.results);
      } catch (error) {
        console.log(error);
      }
    };
    getPinnedBooks();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === pinnedBooks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? pinnedBooks.length - 1 : prevIndex - 1
    );
  };

  return (
    <main className="mt-3 ml-4 rounded-md w-[90%] lg:w-[70%] md:ml-6 bg-[#1f9065]">
      <header className="border-b border-[#1f9065]">
        <h1 className="font-bold text-lg text-white p-2 lg:text-2xl">
          Book recommendation
        </h1>
      </header>
      {pinnedBooks.length > 0 && (
        <div className="relative w-full max-w-md mx-auto">
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-300 ease-in-out flex"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {pinnedBooks.map(
                (
                  { slug, title, author, images, preview_description },
                  index
                ) => (
                  <div
                    key={slug}
                    className="min-w-full flex-shrink-0 p-4 flex flex-col items-center"
                  >
                    <Image
                      src={images[0]}
                      alt={`${title} cover image`}
                      width={150}
                      height={200}
                      className="mb-2"
                    />
                    <h1 className="font-semibold text-lg text-center">
                      {title}
                    </h1>
                    <h2 className="text-sm text-gray-600 text-center">
                      By: {author}
                    </h2>
                    <p className="text-sm text-gray-700 text-center">
                      {preview_description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </main>
  );
}
