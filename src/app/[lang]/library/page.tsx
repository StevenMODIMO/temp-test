import BookSales from "@/components/library/BookSales";
import FreeBooks from "@/components/library/FreeBooks";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
  description: "A collection of free books and for sale",
};

export default function Library() {
  return (
    <main className="bg-gray-200">
      <section className="mx-4 p-2 sm:mx-8 md:mx-10 md:px-2 md:pt-10 lg:max-w-[70%] lg:mx-auto">
      <header className="text-black text-3xl font-semibold md:text-4xl">
        <h1>Library</h1>
      </header>
      <BookSales />
      <FreeBooks />
      </section>
    </main>
  );
}
