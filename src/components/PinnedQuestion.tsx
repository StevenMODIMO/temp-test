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
  }, []);
  return (
    <main className="my-3 lg:my-5 rounded-md">
      <header className="border-b-4 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">It's a question</h1>
      </header>
      <div className="p-4">
        <h2 className="font-semibold text-gray-800 text-2xl">
          {question?.title}
        </h2>
        <p className="text-gray-600">{question?.truncated_answer}</p>
      </div>
    </main>
  );
}
