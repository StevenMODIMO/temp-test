"use client";

import { useEffect, useState } from "react";
import { MdOutlineArrowCircleUp } from "react-icons/md";

export default function GoUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`transition-all p-1 rounded-xl bg-white w-auto h-auto lg:w-auto lg:h-auto ${
        isVisible ? "flex" : "hidden"
      } fixed bottom-20 z-50 right-5 shadow-xl justify-end`}
    >
      <MdOutlineArrowCircleUp onClick={() => scrollToTop()} />
    </div>
  );
}
