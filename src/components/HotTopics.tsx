"use client";
import { useState, useEffect } from "react";
import { IoClipboardOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";

export default function HotTopics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/questions/trending/?limit=4"
        );
        const json = await response.json();
        setTopics(json);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    getTopics();
  }, []);
  return (
    <main className="mt-3 ml-4 w-[90%] lg:w-[70%] md:ml-6">
      <header className="border-b border-[#1f9065]">
        <h1 className="font-bold text-lg text-gray-800 p-2">Lots of topics</h1>
      </header>
      <main className="flex flex-col gap-2 mt-1">
        {topics.map(({ slug, title }) => {
          return (
            <main
              key={slug}
              className="rounded-t-md bg-gray-100 border-b-2 border-[#1f9065]"
            >
              <Link
                href={`/question-details/${slug}`}
                className="flex justify-between p-3"
              >
                <div className="flex items-center gap-1">
                  <IoClipboardOutline className="text-[#1f9065]" />
                  <p>{title}</p>
                </div>
                <MdOutlineArrowOutward className="text-[#1f9065]" />
              </Link>
            </main>
          );
        })}
      </main>
      <Link
        href="/question-details"
        className="border-2 border-[#1f9065] p-3 mt-3 rounded-xl flex items-center gap-1 justify-center"
      >
        All questions <MdOutlineArrowOutward className="text-[#1f9065]" />
      </Link>
    </main>
  );
}
