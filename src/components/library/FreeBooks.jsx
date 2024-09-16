"use client";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BookModal from "./BookModal";

export default function FreeBooks() {
  const [freeBooks, setFreeBooks] = useState([]);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [bookId, setBookId] = useState("");

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
  }, []);

  const next = () => {
    setCurrent((prev) => (prev === freeBooks.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? freeBooks.length - 1 : prevIndex - 1
    );
  };
  return (
    <main className="mt-4">
      <header className="pt-2 pl-2 text-[#1f9065] text-xl font-semibold border-b-4 border-[#1f9065]">
        <h1>Free books</h1>
      </header>
      {open && bookId && <BookModal id={bookId} setOpen={setOpen} />}
      <main className="relative bg-gray-100 mx-0 p-2 rounded-lg mt-2 md:p-4">
        <section className="bg-white p-2 shadow rounded lg:w-52">
          {freeBooks.length > 0 && (
            <div
              onClick={() => {
                setOpen(true);
                setBookId(freeBooks[current].id);
              }}
            >
              <img
                src={freeBooks[current].images[0]}
                alt={freeBooks[current].title}
                className="h-56 w-80 object-cover rounded-md mb-4"
              />
              <p className="font-semibold text-lg text-gray-800">
                {freeBooks[current].title}
              </p>
            </div>
          )}
          <footer className="flex gap-2 justify-end text-[#1f9065]">
            <IoIosArrowBack onClick={prev} />
            <IoIosArrowForward onClick={next} />
          </footer>
        </section>
      </main>
    </main>
  );
}
