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

export default function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openSendQuestion, setOpenSendQuestion] = useState(false); // State for SendQuestion modal
  const [showCategoryLinks, setShowCategoryLinks] = useState(false); // State for showing category links
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, dispatch } = useAuth();
  const isAuth = status === "authenticated";
  const [logoutModal, setLogoutModal] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/categories/"
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

  const handleProtectedRoute = (route) => {
    if (route === "/send-question") {
      if (user) {
        setOpenSendQuestion(true);
      } else {
        setOpenForm(true);
      }
    } else if (route === "/categories") {
      setShowCategoryLinks(!showCategoryLinks);
    } else if (!user) {
      setOpenForm(true);
    } else {
      window.location.href = route;
    }
  };

  return (
    <main className="bg-[#1f9065]">
      <section className="text-gray-200 flex items-center justify-between p-4 lg:max-w-[70%] lg:mx-auto">
        <Link href="/">
          <Image src={logo} alt="logo" width={120} height={120} />
        </Link>
        <section className="text-[16px] md:text-sm md:flex gap-6 items-center lg:gap-16">
          <nav className="hidden md:flex items-center gap-3 lg:gap-6">
            <Link href="/" className="font-semibold">
              Home
            </Link>
            {navLinks.map(({ id, title, route }) => {
              if (
                route === "/latest-answers" ||
                route === "/send-question" ||
                route === "/categories"
              ) {
                return (
                  <main
                    key={id}
                    className={
                      route === "/categories"
                        ? "flex gap-2 items-center font-semibold text-gray-200 hover:text-white cursor-pointer"
                        : "font-semibold text-gray-200 hover:text-white cursor-pointer"
                    }
                    onClick={() => handleProtectedRoute(route)}
                  >
                    {title}
                    {route === "/categories" && <IoIosArrowDown />}
                  </main>
                );
              }
              return (
                <main
                  key={id}
                  className="font-semibold text-gray-200 hover:text-white"
                >
                  <Link
                    onClick={() => setShowCategoryLinks(false)}
                    href={route}
                  >
                    {title}
                  </Link>
                </main>
              );
            })}
            {showCategoryLinks && (
              <div className="absolute top-12 left-[490px] flex flex-col z-[999] bg-white text-black p-2 rounded mt-2">
                {categories.map(({ id, name, slug }) => {
                  return (
                    <Link key={id} href={`/categories/?search=&category_ids=${id}&page=1&pageSize=4`}>
                      {name}
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>
          <section className="flex gap-2 items-center">
            <main>
              {user ? (
                <div
                  onClick={logout}
                  className="relative cursor-pointer flex justify-between gap-6 bg-[#1c855c] rounded items-center hover:bg-[#40aa81] lg:p-2"
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
                  <div>Introduction</div>
                </div>
              )}
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
