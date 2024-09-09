"use client";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";

export default function LatestAnswers() {
  const [answers, setAnswers] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // State to manage the expanded accordion

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/questions/latest/"
        );
        const json = await response.json();
        setAnswers(json);
      } catch (error) {
        console.log(error);
      }
    };
    getAnswers();
  }, []);

  const toggleExpand = (id: any) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <main className="my-3 lg:my-5">
      <header className="border-b-4 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">Last answers</h1>
      </header>
      <main className="flex flex-col gap-2 mt-6">
        {answers.map(({ id, title, truncated_answer }) => (
          <div
            key={id}
            className="rounded-lg bg-gray-100 border-b-4 border-[#1f9065]"
          >
            <button
              onClick={() => toggleExpand(id)}
              className="w-full flex justify-between items-center p-3 lg:text-lg"
            >
              <div className="flex gap-1 items-center">
                <FaRegStar className="text-[#1f9065] font-bold" />
                <h2>{title}</h2>
              </div>
              <IoIosArrowDown />
            </button>
            {expandedId === id && (
              <div className="p-2">
                {truncated_answer}{" "}
                <Link href={`/question-details/${id}`} className='text-[#1f9065]'>more</Link>
              </div>
            )}
          </div>
        ))}
      </main>
    </main>
  );
}
