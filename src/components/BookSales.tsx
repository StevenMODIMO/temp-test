"use client";
import { useState, useEffect } from "react";

export default function BookSales() {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [booksPerSlide, setBooksPerSlide] = useState(3); // State for books per slide

  useEffect(() => {
    const getSalesBooks = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/books/sales/"
        );
        const json = await response.json();
        setBooks(json.results);
      } catch (error) {
        console.log(error);
      }
    };
    getSalesBooks();
  }, []);

  useEffect(() => {
    // Define the media queries
    const updateBooksPerSlide = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setBooksPerSlide(1); // Mobile: 1 slide
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setBooksPerSlide(2); // Tablet: 2 slides
      } else {
        setBooksPerSlide(3); // Desktop: 3 slides
      }
    };

    updateBooksPerSlide(); // Initial call
    window.addEventListener("resize", updateBooksPerSlide); // Listen for resize events

    return () => window.removeEventListener("resize", updateBooksPerSlide); // Cleanup listener
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + booksPerSlide < books.length
        ? prevIndex + booksPerSlide
        : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - booksPerSlide >= 0 ? prevIndex - booksPerSlide : 0
    );
  };

  return (
    <main className="bg-gray-100 rounded-md p-4 mt-3 lg:w-[70%]">
      <header className="border-b-4 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">Books on Sale</h1>
      </header>
      <section className="relative">
        <div className="flex overflow-hidden">
          {books
            .slice(currentIndex, currentIndex + booksPerSlide)
            .map(({ id, title, author, price, images }) => (
              <div
                key={id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 transition-transform duration-300 ease-in-out"
              >
                <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col items-center text-center">
                  <img
                    src={images[0]}
                    alt={title}
                    className="h-40 w-auto object-cover rounded-md mb-4"
                  />
                  <h2 className="font-semibold text-lg text-gray-800">
                    {title}
                  </h2>
                  <p className="text-gray-600 mb-2">Author: {author}</p>
                  <p className="text-[#1f9065] font-bold">{price}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={handlePrev}
            className={`bg-[#1f9065] text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-[#137552] ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentIndex === 0}
          >
            &larr;
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={handleNext}
            className={`bg-[#1f9065] text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-[#137552] ${
              currentIndex + booksPerSlide >= books.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentIndex + booksPerSlide >= books.length}
          >
            &rarr;
          </button>
        </div>
      </section>
    </main>
  );
}
