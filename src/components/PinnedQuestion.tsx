"use client";
import { useState, useEffect } from "react";

interface Question {
  title: string;
  truncated_answer: string;
}

export default function PinnedQuestion() {
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/questions/pinned/"
        );
        const json: Question = await response.json();
        setQuestion(json);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestion();
  });
  return (
    <main className="mt-3 ml-4 rounded-md w-[90%] lg:w-[50%] md:ml-6 bg-white">
      <header className="border-b border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">It's a question</h1>
      </header>
      <div>
        <h2>{question?.title}</h2>
        <p>{question?.truncated_answer}</p>
      </div>
    </main>
  );
}
