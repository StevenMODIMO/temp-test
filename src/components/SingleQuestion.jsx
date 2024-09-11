"use client";
import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa6";
import { FaSquareFull } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { LuArrowDownRight } from "react-icons/lu";

export default function SingleQuestion({ id }) {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      const response = await fetch(
        `https://backfatvo.salyam.uz/api_v1/questions/${id}/`
      );

      const json = await response.json();

      if (response.ok) {
        setQuestion(json);
      } else {
        console.log(json.error);
      }
    };
    getQuestion();
  }, [id]);

  const formattedDate = question.updated_at
    ? new Date(question.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main className="border-b-4 border-[#1f9065] bg-gray-100 rounded-lg w-[80%] ml-6 mt-4 p-6 flex flex-col gap-4">
      <header className="flex justify-between">
        <div className="flex gap-3 items-center">
          <FaSquareFull className="text-[#1f9065] rounded text-3xl" />
          <p className="text-xl">{formattedDate}</p>
        </div>
        <p className="text-lg text-[#1f9065]">
          {question.is_answered ? "Answered" : "Unanswered"}
        </p>
      </header>
      <main>
        <header className="text-xl text-[#1f9065]">
          <h1>Question</h1>
        </header>
        <section className="flex gap-4 p-4">
          <FaCircle className="mt-2 text-xs text-gray-400" />
          <p className="text-lg text-gray-500">{question.question}</p>
        </section>
      </main>
      {answer && (
        <main>
          <header className="text-xl text-[#1f9065]">
            <h1>Answer</h1>
          </header>
          <section className="flex gap-4 p-4">
            <FaCircle className="mt-2 text-xs text-gray-400" />
            <div
              className="text-lg text-[#1f9065]"
              dangerouslySetInnerHTML={{ __html: question.answer }}
            />
          </section>
        </main>
      )}
      <footer>
        {!answer ? (
          <div
            onClick={() => setAnswer(true)}
            className="cursor-pointer w-fit text-lg flex items-center gap-1 border-2 border-[#1f9065] p-1 rounded-xl hover:bg-[#1f9065] hover:text-white"
          >
            <p>More</p>
            <LuArrowDownRight />
          </div>
        ) : (
          <div
            onClick={() => setAnswer(false)}
            className="cursor-pointer w-fit text-lg flex items-center gap-2 border-2 border-[#1f9065] p-1 rounded-xl hover:bg-[#1f9065] hover:text-white"
          >
            <p>Minimize</p>
            <MdOutlineArrowOutward />
          </div>
        )}
      </footer>
    </main>
  );
}
