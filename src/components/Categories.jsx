"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import slugify from "slugify";
import { Suspense } from "react";

export default function Categories() {
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams(); // Use this to read the query params
  const { t, i18n } = useTranslation(["categories"]);

  // Update the states from the URL on component mount
  useEffect(() => {
    const categoryIdsFromUrl =
      searchParams.get("category_ids")?.split(",") || [];
    const searchFromUrl = searchParams.get("search") || "";
    const pageFromUrl = parseInt(searchParams.get("page"), 10) || 1;

    // Set state based on URL params
    setSearch(searchFromUrl);
    setCurrentPage(pageFromUrl);
    if (categoryIdsFromUrl.length > 0) {
      const initialCheckedCategories = {};
      categoryIdsFromUrl.forEach((id) => {
        initialCheckedCategories[id] = true;
      });
      setCheckedCategories(initialCheckedCategories);
    }
  }, [searchParams]);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/categories/",
        {
          headers: {
            "Accept-Language":
              i18n.language === "uz-Cyrl" ? "uz-cyr" : i18n.language,
          },
        }
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

  // Filter categories based on search input
  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, categories]);

  // Fetch questions based on filters
  useEffect(() => {
    const getQuestions = async () => {
      const selectedCategoryIds = Object.keys(checkedCategories).filter(
        (id) => checkedCategories[id]
      );
      const categoryIdsParam =
        selectedCategoryIds.length > 0
          ? `&category_ids=${selectedCategoryIds.join(",")}`
          : "";
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
      const url = `https://backfatvo.salyam.uz/api_v1/questions/?page=${currentPage}&pageSize=6${categoryIdsParam}${searchParam}`;

      try {
        const response = await fetch(url, {
          headers: {
            "Accept-Language":
              i18n.language === "uz-Cyrl" ? "uz-cyr" : i18n.language,
          },
        });
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

  // Update URL whenever filters or pagination changes
  useEffect(() => {
    const selectedCategoryIds = Object.keys(checkedCategories).filter(
      (id) => checkedCategories[id]
    );
    const categoryIdsParam =
      selectedCategoryIds.length > 0
        ? `&category_ids=${selectedCategoryIds.join(",")}`
        : "";
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    router.push(
      `/uz/categories?page=${currentPage}&pageSize=6${categoryIdsParam}${searchParam}`
    );
  }, [currentPage, checkedCategories, search]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (id) => {
    setCheckedCategories((prevChecked) => {
      const newChecked = { ...prevChecked, [id]: !prevChecked[id] };
      return newChecked;
    });
  };

  return (
    <Suspense>
      <section className="flex gap-4">
        <main className="flex-1">
          <header>
            <form className="ml-4">
              <label htmlFor="search"></label>
              <input
                id="search"
                className="p-2 rounded-md outline-none lg:w-[70%]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search")}
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
                      <header className="flex gap-2 items-center justify-between">
                        <Link
                          href={`/question-details/${slugify(title)}/${id}`}
                          className="text-[#1f9065] text-2xl font-semibold"
                        >
                          {title}
                        </Link>
                        <p className="text-gray-400 mt-2 text-sm">
                          {view} {t("views")}
                        </p>
                      </header>
                      <p className="text-[16px]">{truncated_question}</p>
                      <div className="h-[2px] w-[95%] mx-auto bg-gray-200"></div>
                      <p className="text-[16px]">{truncated_answer}</p>
                      <footer className="flex justify-between text-sm">
                        <div className="text-gray-400">
                          {new Date(updated_at).toLocaleString()}
                        </div>
                        <Link
                          href={`/question-details/${slugify(title)}/${id}`}
                          className="text-[#1f9065] font-semibold"
                        >
                          {t("readMore")}
                        </Link>
                      </footer>
                    </main>
                  );
                }
              )
            ) : (
              <p className="text-center text-gray-500">{t("noResults")}</p>
            )}
            {questions.length > 0 && (
              <div className="pagination flex justify-center gap-2 mt-4">
                <button
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-3 py-1 border rounded ${
                      page === currentPage ? "bg-[#1f9065] text-white" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </main>
        <main className="w-[30%] mt-6">
          <section className="bg-white rounded-lg p-6 border-b-4 border-[#1f9065]">
            <header>
              <h1 className="text-xl font-semibold mb-4">{t("title")}</h1>
            </header>
            <div>
              {filteredCategories.map((category) => (
                <div key={category.id} className="flex items-center gap-2 my-1">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={checkedCategories[category.id] || false}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </section>
        </main>
      </section>
    </Suspense>
  );
}
