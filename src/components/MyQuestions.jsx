"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaCircle } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function MyQuestions() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({
    category1: false,
    category2: false,
  });
  const [selectedAnswer, setSelectedAnswer] = useState({
    category1: false,
    category2: false,
  });
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const { t, i18n } = useTranslation(["latestAnswers"]);

  useEffect(() => {
    const getQuestions = async () => {
      const tokens = JSON.parse(localStorage.getItem("user_tokens"));
      const access = tokens?.access_token;

      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/questions/mine/",
        {
          headers: {
            "Accept-Language":
              i18n.language === "uz-Cyrl" ? "uz-cyr" : i18n.language,
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setQuestions(json);
        setFilteredQuestions(json);
      } else {
        console.log(json.error);
      }
    };
    getQuestions();
  }, [user]);
  useEffect(() => {
    let filtered = questions;

    if (selectedAnswer.category1 && !selectedAnswer.category2) {
      filtered = questions.filter((q) => q.is_answered === true);
    } else if (!selectedAnswer.category1 && selectedAnswer.category2) {
      filtered = questions.filter((q) => q.is_answered === false);
    }

    setFilteredQuestions(filtered);
  }, [selectedAnswer, questions]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleAnswerCheckbox = (event) => {
    const { name, checked } = event.target;
    setSelectedAnswer((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/categories/",
        {
          headers: {
            "Accept-Language":
              i18n.language === "uz-Cyrl" ? "uz-cyr" : i18n.language,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setCategories(json);
      } else {
        console.log(json.error);
      }
    };

    getCategories();
  }, []);

  return (
    <main className="bg-gray-200">
      <header className="flex flex-col gap-4 mx-28 lg:max-w-[70%] lg:mx-auto">
        <header className="font-semibold text-3xl mt-4">
          <p>
            {t("welcome")} {user?.first_name}!
          </p>
        </header>
        <header className="font-semibold text-2xl text-[#1f9065]">
          <p>{t("myQuestion")}</p>
        </header>
      </header>
      <section className="flex gap-4 mx-24 lg:max-w-[70%] lg:mx-auto">
        {filteredQuestions.length > 0 ? (
          <main className="flex flex-col gap-4 p-4 w-[90%]">
            {filteredQuestions.map(
              ({ title, view, updated_at, is_answered }, index) => {
                const formattedDate = updated_at
                  ? new Date(updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "";
                return (
                  <main
                    key={index}
                    className="py-12 px-6 flex flex-col gap-5 p-3 border-b-2 border-[#1f9065] bg-white rounded-xl"
                  >
                    <header className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-md bg-[#1f9065]"></div>
                        <p className="text-xl text-gray-600">{formattedDate}</p>
                      </div>
                      <div>
                        {is_answered ? (
                          <div className="flex gap-2 items-center">
                            <div className="rounded-full h-2 w-2 bg-[#1f9065]"></div>
                            <p className="text-[#1f9065]">{t("answered")}</p>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <div className="rounded-full h-2 w-2 bg-red-500"></div>
                            <p className="text-red-500">
                              {t("beingConsidered")}
                            </p>
                          </div>
                        )}
                      </div>
                    </header>
                    <section>
                      <header className="text-[#1f9065] text-lg">
                        <h1>{t("question")}</h1>
                      </header>
                      <div className="flex items-center gap-2 ml-4">
                        <FaCircle className="text-gray-400 text-[5px]" />
                        <p className="text-gray-400 text-lg">{title}</p>
                      </div>
                    </section>
                  </main>
                );
              }
            )}
          </main>
        ) : (
          <>
            {!user ? (
              <main>
                <p className="text-center text-2xl font-semibold mt-24">
                  {t("noLogged")}
                </p>
              </main>
            ) : (
              <main>
                <p className="text-center text-2xl font-semibold mt-24">
                  {t("noQuestion")}
                </p>
              </main>
            )}
          </>
        )}
        <main className="w-[30%] mt-6">
          <section className="bg-white rounded-lg p-6 border-b-4 border-[#1f9065] flex flex-col gap-3">
            <header>
              <h1 className="text-xl font-semibold mb-4">{t("visibility")}</h1>
            </header>
            <form>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="category1"
                  checked={selectedAnswer.category1}
                  onChange={handleAnswerCheckbox}
                  className="mr-2"
                />
                {t("Answered")}
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  name="category2"
                  checked={selectedAnswer.category2}
                  onChange={handleAnswerCheckbox}
                  className="mr-2"
                />
                {t("unAnswered")}
              </label>
            </form>
            <header>
              <h1 className="text-xl font-semibold mb-4">{t("categories")}</h1>
            </header>
            <div>
              {categories.map((category) => (
                <div key={category.id} className="flex items-center gap-2 my-1">
                  <input type="checkbox" id={category.name} />
                  <label htmlFor={category.name}>{category.name}</label>
                </div>
              ))}
            </div>
          </section>
        </main>
      </section>
    </main>
  );
}
