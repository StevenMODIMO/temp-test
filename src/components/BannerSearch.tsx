"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

export default function BannerSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (search.length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://backfatvo.salyam.uz/api_v1/questions/autosuggest/?q=${search}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const debounceFetch = setTimeout(fetchResults, 500);

    return () => clearTimeout(debounceFetch);
  }, [search]);

  return (
    <main className="relative">
      <form>
        <label
          htmlFor="search"
          className={
            results.length > 0
              ? "rounded-t-md p-3 flex items-center justify-between border border-[#1f9065] bg-black/50 sm:w-96"
              : "rounded-[32px] p-3 flex items-center justify-between border border-[#1f9065] bg-black/50 sm:w-96"
          }
        >
          <input
            className="ml-2 rounded-full outline-none bg-black/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
          />
          {loading && (
            <div className="w-3 h-3 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          )}
        </label>
      </form>
      {!loading && results.length > 0 && (
        <ul className="absolute bg-white w-full text-black rounded-b-md">
          {results.map((result: any) => (
            <li key={result.id} className="hover:bg-gray-200">
              <Link
                href={`/question-details/${slugify(result.title)}/${result.id}`}
                className="block p-2"
              >
                {result.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
