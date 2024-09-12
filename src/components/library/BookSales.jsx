"use client";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function BookSales() {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [booksPerSlide, setBooksPerSlide] = useState(3); // State for books per slide

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/books/sales/"
      );

      const json = await response.json();

      if (response.ok) {
        setBooks(json.results);
      } else {
        console.log(json.error);
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    const updateBooksPerSlide = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setBooksPerSlide(1);
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setBooksPerSlide(3);
      } else {
        setBooksPerSlide(4);
      }
    };

    updateBooksPerSlide();
    window.addEventListener("resize", updateBooksPerSlide);

    return () => window.removeEventListener("resize", updateBooksPerSlide);
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
    <main>
      <header className="mt-3 pt-2 pl-2 text-[#1f9065] text-xl font-semibold border-b-4 border-[#1f9065]">
        <h1>Available for sale</h1>
      </header>
      <main className="relative bg-gray-100 mx-0 p-2 rounded-lg mt-2 md:p-4">
        <div className="flex gap-8">
          {books
            .slice(currentIndex, currentIndex + booksPerSlide)
            .map(({ id, title, price, images }) => (
              <div key={id} className="bg-white p-3 shadow rounded">
                <div>
                  <img
                    src={images[0]}
                    alt={title}
                    className="h-56 w-80 object-cover rounded-md mb-4 lg:w-96 lg:h-64"
                  />
                  <h2 className="font-semibold text-lg text-gray-800">
                    {title}
                  </h2>
                  <p className="text-[#1f9065] font-bold">{price}</p>
                </div>
              </div>
            ))}
        </div>
        <section className="flex justify-between mt-4 cursor-pointer">
          <div onClick={handlePrev} className="bg-gray-200 p-4 rounded-full absolute top-1/2 left-0 hover:bg-[#1f9065] hover:text-white">
            <IoIosArrowBack />
          </div>
          <div onClick={handleNext} className="bg-gray-200 p-4 rounded-full absolute top-1/2 right-0 hover:bg-[#1f9065] hover:text-white">
            <IoIosArrowForward />
          </div>
        </section>
      </main>
    </main>
  );
}
