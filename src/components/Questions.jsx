"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/questions/"
      );
      const json = await response.json();

      if (response.ok) {
        setQuestions(json.results);
      } else {
        console.log(json.error);
      }
    };
    getQuestions();
  }, []);
  return (
    <main>
      <div className="flex flex-col gap-4 p-4">
        {questions.map(({ id, title, view, truncated_answer, updated_at }) => {
          return (
            <main
              key={id}
              className="flex flex-col gap-5 p-3 border-b-2 border-[#1f9065] bg-white rounded-xl"
            >
              <header className="flex gap-2 items-center">
                <p className="text-[#1f9065] text-2xl font-semibold">{title}</p>
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
        })}
      </div>
    </main>
  );
}
