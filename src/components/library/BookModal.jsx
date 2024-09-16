"use client";
import { useEffect, useState } from "react";
import Backdrop from "../Backdrop";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function BookModal({ id, setOpen }) {
  const [book, setBook] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const getBook = async () => {
      const response = await fetch(
        `https://backfatvo.salyam.uz/api_v1/books/${id}/`
      );

      const json = await response.json();

      if (response.ok) {
        setBook(json);
      } else {
        console.log(json.error);
      }
    };
    getBook();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === book.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? book.images?.length - 1 : prevIndex - 1
    );
  };

  const handleDownload = () => {
    if (book.file) {
      const link = document.createElement("a");
      link.href = book.file;
      link.download = book.title || "book";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Backdrop>
      <main className="bg-white w-[60%] h-[90%] rounded-md p-4 overflow-auto">
        <header className="flex justify-end">
          <FaTimes
            onClick={() => setOpen(false)}
            className="cursor-pointer w-10 h-10 bg-[#1f9065] rounded-full p-2 text-white"
          />
        </header>
        {book.images?.length > 0 && (
          <div className="relative w-full h-64 mt-2">
            <img
              src={book.images[currentImageIndex]}
              alt="Book"
              className="w-full h-full object-cover rounded-md"
            />
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
        <section className="flex flex-col gap-2 mt-4">
          <p className="text-[#1f9065] text-3xl font-semibold">{book.title}</p>
          <p>
            <span className="text font-semibold">{t("author")}:</span>{" "}
            {book.author}
          </p>
          <div>
            <p className="text font-semibold">{t("description")}:</p>
            <div dangerouslySetInnerHTML={{ __html: book.description }} />
          </div>
          <p>
            <span className="text font-semibold">{t("publisher")}:</span>{" "}
            {book.publisher}
          </p>
          <p>
            <span className="text font-semibold">{t("price")}:</span>{" "}
            {book.price_formatted}
          </p>
          {book.is_free ? (
            <button
              onClick={handleDownload}
              className={
                book.file
                  ? "bg-[#1f9065] w-24 text-white rounded-md p-2"
                  : "hidden"
              }
            >
              {book.file && "Download"}
            </button>
          ) : (
            <button
              onClick={() => setShow(!show)}
              className="bg-[#1f9065] w-24 text-white rounded-md p-2"
            >
              {show && book.phone ? (
                <a href={`tel:+${book.phone}`}>{book.phone}</a>
              ) : (
                "Sale"
              )}
            </button>
          )}
        </section>
      </main>
    </Backdrop>
  );
}
