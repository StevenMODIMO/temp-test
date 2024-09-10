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
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import LoginForm from "./LoginForm";

interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  const [openLinks, setOpenLinks] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
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

  return (
    <main className="bg-[#1f9065] text-gray-200 p-4 flex justify-between md:p-4">
      <Link href="/">
        <Image src={logo} alt="logo" width={120} height={120} />
      </Link>
      <section className="text-[16px] md:text-sm md:flex gap-6 items-center lg:gap-24">
        <nav className="hidden md:flex gap-3 lg:gap-6">
          <Link href="/">Home</Link>
          <div
            className="relative"
            onClick={() => setShowCategories(!showCategories)}
          >
            <button className="flex items-center gap-2 font-semibold text-gray-200 hover:text-white">
              <p>Categories</p>
              <MdOutlineKeyboardArrowDown className="text-xl" />
            </button>
            {showCategories && (
              <div className="z-10 absolute top-full mt-2 w-32 bg-white text-black p-2 rounded shadow-lg">
                {categories.map(({ id, slug, name }) => {
                  return (
                    <Link href={`/categories/${id}`}>
                      {name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          {navLinks.map(({ id, title, route }) => {
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
          <div
            onClick={() => setOpenForm(true)}
            className="cursor-pointer flex items-center hover:rounded hover:bg-[#40aa81] lg:p-3"
          >
            <FiUser />
            <div>Introduction</div>
          </div>
          <div className="md:hidden" onClick={() => setOpenLinks(!openLinks)}>
            {openLinks ? <FaTimes /> : <FaBars />}
          </div>
        </section>
      </section>
      <AnimatePresence>
        {openLinks && <NavLinks setOpenLinks={setOpenLinks} />}
      </AnimatePresence>
      {openForm && <LoginForm setOpenForm={setOpenForm} />}
    </main>
  );
}
