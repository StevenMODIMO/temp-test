"use client";
import { useState, useEffect } from "react";

export default function Categories() {
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
  return <main></main>;
}
