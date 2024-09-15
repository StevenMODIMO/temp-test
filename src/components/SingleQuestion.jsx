"use client";
import { useState, useEffect } from "react";
import { FaSquareFull } from "react-icons/fa";
import Attachment from "./Attachment";

export default function SingleQuestion({ id }) {
  const [question, setQuestion] = useState({});
  const [open, setOpen] = useState(false);

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
    <main className="border-b-4 border-[#1f9065] bg-gray-100 rounded-lg w-[80%] ml-6 mt-4 p-6 flex flex-col gap-4 lg:w-[70%] lg:mx-auto">
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
        <section className="flex gap-4 p-4">
          <p className="text-lg text-gray-500">{question.question}</p>
        </section>
      </main>
      <main className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="bg-[#1f9065] text-white p-2 rounded-md"
        >
          View attachment
        </button>
      </main>
      <main>
        <section className="flex gap-4 p-4">
          <div
            className="text-lg text-[#1f9065]"
            dangerouslySetInnerHTML={{ __html: question.answer }}
          />
        </section>
      </main>
      {open && (
        <Attachment setOpen={setOpen} attached_file={question.attached_file} />
      )}
    </main>
  );
}
