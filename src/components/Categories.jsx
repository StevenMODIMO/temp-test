"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function slugify(string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

export default function Categories() {
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState({});
  const router = useRouter();
  const { t } = useTranslation()

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/categories/"
      );
      const json = await response.json();

      if (response.ok) {
        setCategories(json);
        setFilteredCategories(json);
      } else {
        console.log(json.error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    // Update filteredCategories based on search input
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, categories]);

  useEffect(() => {
    const getQuestions = async () => {
      const selectedCategoryIds = Object.keys(checkedCategories).filter(
        (id) => checkedCategories[id]
      );
      const categoryIdsParam =
        selectedCategoryIds.length > 0 ? `&category_ids=${selectedCategoryIds.join(",")}` : "";
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
      const url = `https://backfatvo.salyam.uz/api_v1/questions/?page=${currentPage}&pageSize=6${categoryIdsParam}${searchParam}`;

      try {
        const response = await fetch(url);
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
  }, [currentPage, checkedCategories, search]);

  useEffect(() => {
    // Update URL with search and category filters
    const selectedCategoryIds = Object.keys(checkedCategories).filter(
      (id) => checkedCategories[id]
    );
    const categoryIdsParam =
      selectedCategoryIds.length > 0 ? `&category_ids=${selectedCategoryIds.join(",")}` : "";
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    router.push(`/uz/categories?page=${currentPage}&pageSize=6${categoryIdsParam}${searchParam}`);
  }, [currentPage, checkedCategories, search]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (id) => {
    setCheckedCategories((prevChecked) => {
      const newChecked = { ...prevChecked, [id]: !prevChecked[id] };
      const selectedCategoryIds = Object.keys(newChecked).filter((id) => newChecked[id]);

      if (selectedCategoryIds.length === 0) {
        // If no categories are selected, show all questions
        setCheckedCategories({});
      } else {
        setCheckedCategories(newChecked);
      }

      return newChecked;
    });
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
              placeholder="Search..."
            />
          </form>
        </header>
        <div className="flex flex-col gap-4 p-4 w-[90%]">
          {questions.length > 0 ? (
            questions.map(
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
                      <Link
                        href={`/question-details/${slugify(title)}/${id}`}
                        className="text-[#1f9065] text-2xl font-semibold"
                      >
                        {title}
                      </Link>
                      <p className="text-gray-400 mt-2 text-sm">{view} views</p>
                    </header>
                    <p className="text-[16px]">{truncated_question}</p>
                    <div className="h-[2px] w-[95%] mx-auto bg-gray-200"></div>
                    <p className="text-[16px]">{truncated_answer}</p>
                    <footer className="flex justify-between text-sm">
                      <div className="text-gray-400">
                        {new Date(updated_at).toLocaleString()}
                      </div>
                    </footer>
                  </main>
                );
              }
            )
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
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
            <h1 className="text-xl font-semibold mb-4">{t("title")}</h1>
          </header>
          <div>
            {filteredCategories.map((category) => (
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
