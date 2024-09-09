"use client";
import { useState, useEffect } from "react";

export default function BookSales() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getSalesBooks = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/books/sales/"
        );
        const json = await response.json();
        console.log(json.results);
      } catch (error) {
        console.log(error);
      }
    };
    getSalesBooks();
  });
  return (
    <main className="w-[95%] mx-auto bg-gray-100 rounded-md p-4 mt-3 cursor-pointer">
      <header className="border-b border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">Books on sale</h1>
      </header>
      <section>
        {books.map(({ id, title, author, price }) => {
          return (
            <main key={id}>
              <h1>{title}</h1>
              <p>By: {author}</p>
              <p>{price}</p>
            </main>
          );
        })}
      </section>
    </main>
  );
}
