"use client";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/lib/data";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/public/Frame.png";
import { FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import { AnimatePresence } from "framer-motion";
import { LuLogOut } from "react-icons/lu";
import LoginForm from "./LoginForm";
import SendQuestion from "./SendQuestion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import LanguageBlock from "./LanguageBlock";

export default function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openSendQuestion, setOpenSendQuestion] = useState(false); // State for SendQuestion modal
  const [showCategoryLinks, setShowCategoryLinks] = useState(false); // State for showing category links
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, dispatch } = useAuth();
  const isAuth = status === "authenticated";
  const { t, i18n } = useTranslation();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/categories/",
        {
          headers: {
            "Accept-Language": i18n.language === 'uz-Cyrl' ? "uz-cyr" : i18n.language,
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

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_tokens");
    dispatch({ type: "LOGOUT" });
    router.push("/");
    if (isAuth) {
      signOut();
    }
  };

  return (
    <main className="bg-[#1f9065]">
      <section className="text-gray-200 flex items-center justify-between p-4 lg:w-[80%] lg:mx-auto">
        <Link href="/">
          <Image src={logo} alt="logo" width={120} height={120} />
        </Link>
        <section className="text-[16px] md:text-sm md:flex gap-6 items-center lg:gap-6">
          <nav className="hidden md:flex items-center gap-3 lg:gap-6">
            <Link href="/" className="font-semibold">
              {t("home")}
            </Link>
            <div className="relative cursor-pointer lg:flex flex-col lg:items-center lg:justify-center">
              <header
                className="flex items-center gap-2 text-gray-200 font-semibold"
                onClick={() => setShowCategoryLinks(!showCategoryLinks)}
              >
                <h1>{t("categories")}</h1>
                <IoIosArrowDown
                  className={showCategoryLinks ? "rotate-180" : ""}
                />
              </header>
              {showCategoryLinks && (
                <main className="z-[999] absolute top-8 bg-white text-black p-1 rounded-md shadow lg:grid lg:grid-cols-5 lg:gap-2 lg:w-[800px]">
                  {categories.map(({ id, name, slug }) => {
                    return (
                      <Link
                        key={id}
                        href={`/categories/?search=&category_ids=${id}&page=1&pageSize=4`}
                        onClick={() => setShowCategoryLinks(false)}
                      >
                        {name}
                      </Link>
                    );
                  })}
                </main>
              )}
            </div>
            <div
              onClick={() => {
                if (user) {
                  setOpenSendQuestion(true);
                } else {
                  setOpenForm(true);
                }
              }}
              href="/send-question"
              className="font-semibold cursor-pointer"
            >
              {t("sendQuestion")}
            </div>
            <Link href="/library" className="font-semibold">
              {t("library")}
            </Link>
            <Link href="/media" className="font-semibold">
              {t("media")}
            </Link>
            {user ? (
              <Link href="/latest-answers" className="font-semibold">
                {t("latestAnswer")}
              </Link>
            ) : (
              <div
                onClick={() => setOpenForm(true)}
                className="font-semibold text-gray-200"
              >
                {t("latestAnswer")}
              </div>
            )}
          </nav>
          <section className="flex gap-2 items-center">
            <main className="flex gap-1 items-center">
              {user ? (
                <div
                  onClick={logout}
                  className="relative cursor-pointer flex justify-between gap-3 bg-[#1c855c] rounded items-center hover:bg-[#40aa81] lg:p-2"
                >
                  <div className="flex gap-2 items-center">
                    <FiUser className="text-lg" />
                    <p className="text-lg font-semibold">{user.first_name}</p>
                  </div>
                  <LuLogOut className="text-lg" />
                </div>
              ) : (
                <div
                  onClick={() => setOpenForm(true)}
                  className="cursor-pointer flex items-center hover:rounded hover:bg-[#40aa81] lg:p-3"
                >
                  <FiUser />
                  <div>{t("introduction")}</div>
                </div>
              )}
              <LanguageBlock />
            </main>
            <div className="md:hidden" onClick={() => setOpenLinks(!openLinks)}>
              {openLinks ? <FaTimes /> : <FaBars />}
            </div>
          </section>
        </section>
        <AnimatePresence>
          {openLinks && <NavLinks setOpenLinks={setOpenLinks} />}
        </AnimatePresence>
        {openForm && <LoginForm setOpenForm={setOpenForm} />}
        {openSendQuestion && <SendQuestion setOpen={setOpenSendQuestion} />}
      </section>
    </main>
  );
}
