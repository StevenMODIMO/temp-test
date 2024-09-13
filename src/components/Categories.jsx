"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Categories() {
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/categories/"
      );
      const json = await response.json();

      if (response.ok) {
        setCategories(json);
      } else {
        console.log(json.error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetch(
          `https://backfatvo.salyam.uz/api_v1/questions/?page=${currentPage}&pageSize=6`
        );
        const json = await response.json();

        if (response.ok) {
          setQuestions(json.results);
          setTotalPages(json.pages_count);
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

  const handleCheckboxChange = (id) => {
    setCheckedCategories((prevChecked) => ({
      ...prevChecked,
      [id]: !prevChecked[id],
    }));
  };

  return (
    <section className="flex gap-4">
      <main className="flex-1">
        <header>
          <form className="ml-6">
            <label htmlFor="search"></label>
            <input
              id="search"
              className="p-2 rounded-md outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search bar"
            />
          </form>
        </header>
        <div className="flex flex-col gap-4 p-4 w-[90%]">
          {questions.map(
            ({
              id,
              title,
              view,
              truncated_question,
              truncated_answer,
              updated_at,
            }) => {
              return (
                <main
                  key={id}
                  className="flex flex-col gap-5 p-3 border-b-2 border-[#1f9065] bg-white rounded-xl"
                >
                  <header className="flex gap-2 items-center">
                    <p className="text-[#1f9065] text-2xl font-semibold">
                      {title}
                    </p>
                    <p className="text-gray-400 mt-2 text-sm">{view} views</p>
                  </header>
                  <p className="text-[16px]">{truncated_question}</p>
                  <div className="h-[2px] w-[95%] mx-auto bg-gray-200"></div>
                  <p className="text-[16px]">{truncated_answer}</p>
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
          <div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={category.id}
                  checked={!!checkedCategories[category.id]}
                  onChange={() => handleCheckboxChange(category.id)}
                  className="cursor-pointer"
                />
                <label htmlFor={category.id} className="cursor-pointer">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}

// "use client";
// import { useSearchParams } from "next/navigation";

// export default function Categories() {
//   const searchParams = useSearchParams();
//   return (
//     <section>
//       <header>Categories.</header>
//       <div>
//         <p>Search: {searchParams.get("search")}</p>
//         <p>Category id: {searchParams.get("category_ids")}</p>
//         <p>page: {searchParams.get("page")}</p>
//         <p>pageSize: {searchParams.get("pageSize")}</p>
//       </div> 
//     </section>
//   );
// }
