"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Categories() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState({
    category1: false,
    category2: false,
  });

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetch(
          `https://backfatvo.salyam.uz/api_v1/questions/?page=${currentPage}&pageSize=4`
        );
        const json = await response.json();

        if (response.ok) {
          setQuestions(json.results);
          setTotalPages(json.pages_count); // Assuming the response provides the total page count
        } else {
          console.error(json.error);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    getQuestions();
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <section className="flex gap-4">
      <main className="flex-1">
        <div className="flex flex-col gap-4 p-4 w-[90%]">
          {questions.map(
            ({ id, title, view, truncated_answer, updated_at }) => {
              return (
                <main
                  key={id}
                  className="flex flex-col gap-5 p-3 border-b-2 border-[#1f9065] bg-white rounded-xl"
                >
                  <header className="flex gap-2 items-center">
                    <p className="text-[#1f9065] text-2xl font-semibold">
                      {title}
                    </p>
                    <p className="text-gray-400">{view} views</p>
                  </header>
                  <p>{truncated_answer}</p>
                  <footer className="flex justify-between text-sm">
                    <div className="text-gray-400">
                      {new Date(updated_at).toLocaleString()}
                    </div>
                    <Link
                      href={`/question-details/${id}`}
                      className="text-[#1f9065]"
                    >
                      Read more...
                    </Link>
                  </footer>
                </main>
              );
            }
          )}
          <div className="pagination flex justify-center gap-2 mt-4">
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage ? "bg-[#1f9065] text-white" : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <main className="w-[30%] mt-6">
        <section className="bg-white rounded-lg p-6 border-b-4 border-[#1f9065]">
          <header>
            <h1 className="text-xl font-semibold mb-4">Categories</h1>
          </header>
          <form>
            <label className="block mb-2">
              <input
                type="checkbox"
                name="category1"
                checked={selectedCategories.category1}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Category 1
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="category2"
                checked={selectedCategories.category2}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Category 2
            </label>
          </form>
        </section>
      </main>
    </section>
  );
}
