"use client";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function FreeBooks() {
  const [freeBooks, setFreeBooks] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const getFreeBooks = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/books/free/"
        );
        const json = await response.json();
        setFreeBooks(json.results);
      } catch (error) {
        console.log(error);
      }
    };
    getFreeBooks();
  });

  const next = () => {
    setCurrent((prev) => (prev === freeBooks.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? freeBooks.length - 1 : prevIndex - 1
    );
  };
  return (
    <main className="my-3 lg:my-5 bg-[#1f9065] rounded-md p-4 mt-3 cursor-pointer lg:h-[30%] lg:p-2 lg:w-[20%] lg:mt-16">
      <header>
        <h1 className="font-bold text-lg text-white p-2">Library</h1>
      </header>
      <section className="text-white flex flex-col gap-2 my-3">
        {freeBooks.length > 0 && (
          <>
            <img
              src={freeBooks[current].images[0]}
              alt={freeBooks[current].title}
              className="w-64 h-36 object-cover rounded-md transition duration-700 ease-in-out mx-auto lg:w-52"
            />
            <p className="font-semibold text-xl">{freeBooks[current].title}</p>
          </>
        )}
        <footer className="flex gap-2 justify-end text-white">
          <IoIosArrowBack onClick={prev} />
          <IoIosArrowForward onClick={next} />
        </footer>
      </section>
    </main>
  );
}
