"use client";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/lib/data";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/public/Frame.png";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import NavLinks from "./NavLinks";
import { AnimatePresence } from "framer-motion";
import { LuLogOut } from "react-icons/lu";
import LoginForm from "./LoginForm";
import SendQuestion from "./SendQuestion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  const [openLinks, setOpenLinks] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openSendQuestion, setOpenSendQuestion] = useState(false); // State for SendQuestion modal
  const router = useRouter();

  const { user, dispatch } = useAuth();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_tokens");
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  const handleProtectedRoute = (route: string) => {
    if (route === "/send-question") {
      if (user) {
        setOpenSendQuestion(true); // Open SendQuestion modal if user is authenticated
      } else {
        setOpenForm(true); // Open LoginForm modal if user is not authenticated
      }
    } else if (!user) {
      setOpenForm(true); // Open LoginForm modal for other protected routes if user is not authenticated
    } else {
      window.location.href = route; // Redirect to route if user is authenticated
    }
  };

  return (
    <main className="bg-[#1f9065] text-gray-200 p-4 flex justify-between md:p-4">
      <Link href="/">
        <Image src={logo} alt="logo" width={120} height={120} />
      </Link>
      <section className="text-[16px] md:text-sm md:flex gap-6 items-center lg:gap-16">
        <nav className="hidden md:flex gap-3 lg:gap-6">
          <Link href="/" className="font-semibold">
            Home
          </Link>
          {navLinks.map(({ id, title, route }) => {
            if (route === "/latest-answers" || route === "/send-question") {
              return (
                <main
                  key={id}
                  className="font-semibold text-gray-200 hover:text-white cursor-pointer"
                  onClick={() => handleProtectedRoute(route)}
                >
                  {title}
                </main>
              );
            }
            return (
              <main
                key={id}
                className="font-semibold text-gray-200 hover:text-white"
              >
                <Link href={route}>{title}</Link>
              </main>
            );
          })}
        </nav>
        <section className="flex gap-2 items-center">
          <main>
            {user ? (
              <div className="relative cursor-pointer flex justify-between gap-6 bg-[#1c855c] rounded items-center hover:bg-[#40aa81] lg:p-2">
                <div className="flex gap-2 items-center">
                  <FiUser className="text-lg" />
                  <p className="text-lg font-semibold">{user.first_name}</p>
                </div>
                <LuLogOut onClick={logout} className="text-lg" />
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
    </main>
  );
}
