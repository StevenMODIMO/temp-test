"use client";
import { useEffect, useState } from "react";
import Backdrop from "../Backdrop";

export default function BookModal({ id, setOpen }) {
  const [book, setBook] = useState(null);

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

  if (!book) {
    return (
      <Backdrop>
        <div className="flex items-center justify-center h-full">
          <p className="text-white">Loading...</p>
        </div>
      </Backdrop>
    );
  }

  return (
    <Backdrop>
      <main
        className="bg-white w-[70%] rounded-md p-6 my-5 overflow-y-auto z-[999]"
        onClick={() => setOpen(false)}
      >
        <h1 className="text-2xl font-bold text-[#1f9065]">{book.title}</h1>
        <p className="text-lg text-black mt-2">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-lg text-black mt-2">
          <strong>Description:</strong> {book.description}
        </p>
        <p className="text-lg text-black mt-2">
          <strong>Publisher:</strong> {book.publisher}
        </p>
        <p className="text-lg text-black mt-2">
          <strong>Updated At:</strong>{" "}
          {new Date(book.updated_at).toLocaleDateString()}
        </p>
        <p className="text-lg text-black mt-2">
          <strong>Price:</strong> {book.is_free ? "Free" : `$${book.price}`}
        </p>
        <p className="text-lg text-black mt-2">
          <strong>Contact:</strong> {book.phone}
        </p>
        <p className="text-lg text-black mt-2">
          <strong>Amount:</strong> {book.amount}
        </p>
        <ImageSlider images={book.images} />
      </main>
    </Backdrop>
  );
}

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative mt-4">
      <img
        src={images[currentIndex]}
        alt={`Book Image ${currentIndex + 1}`}
        className="w-full h-64 object-cover rounded-md"
      />
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 bg-[#1f9065] text-white p-2 rounded-full"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 bg-[#1f9065] text-white p-2 rounded-full"
      >
        &#8250;
      </button>
    </div>
  );
}
