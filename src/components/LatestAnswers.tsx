"use client";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";

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
    <main className="ml-4 w-[90%] lg:w-[50%] md:ml-6">
      <header className="border-b-2 border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">Last answers</h1>
      </header>
      <main className="flex flex-col gap-2 mt-1">
        {answers.map(({ id, title, truncated_answer }) => (
          <div key={id} className="rounded-t-md bg-gray-100 border-b-2 border-[#1f9065]">
            <button
              onClick={() => toggleExpand(id)}
              className="w-full flex justify-between items-center p-3 lg:text-lg"
            >
              <div className="flex gap-1 items-center">
                <FaRegStar />
                <h2>{title}</h2>
              </div>
              <IoIosArrowDown />
            </button>
            {expandedId === id && <div className="p-2">{truncated_answer}</div>}
          </div>
        ))}
      </main>
    </main>
  );
}
