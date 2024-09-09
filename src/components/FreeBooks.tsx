"use client";
import { useState, useEffect } from "react";

export default function FreeBooks() {
  const [pinnedBooks, setPinnedBooks] = useState([]);

  useEffect(() => {
    const getFreeBooks = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/books/free/"
        );
        const json = await response.json()
        setPinnedBooks(json.results);
      } catch (error) {
        console.log(error);
      }
    };
    getFreeBooks();
  });
  return (
    <main className="w-[95%] h-[40%] mx-auto bg-gray-100 rounded-md p-4 mt-3 cursor-pointer">
      <header className="border-b border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">Library</h1>
      </header>
    </main>
  );
}
