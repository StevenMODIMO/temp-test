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

interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  const [openLinks, setOpenLinks] = useState(false);
  return (
    <main className="bg-[#1f9065] text-gray-200 p-4 flex justify-between md:p-6">
      <Link href="/">
        <Image src={logo} alt="logo" width={120} height={120} />
      </Link>
      <section className="text-[16px] md:text-sm md:flex gap-6 items-center lg:gap-24 lg:text-[15px]">
        <nav className="hidden md:flex gap-3 lg:gap-6">
          {navLinks.map(({ id, title, route }) => {
            return (
              <main key={id}>
                <Link href={route}>{title}</Link>
              </main>
            );
          })}
        </nav>
        <section className="flex gap-2 items-center">
          <Link
            href="/login"
            className="flex items-center hover:rounded hover:bg-[#40aa81] lg:p-3"
          >
            <FiUser />
            <div>Introduction</div>
          </Link>
          <div className="md:hidden" onClick={() => setOpenLinks(!openLinks)}>
            {openLinks ? <FaTimes /> : <FaBars />}
          </div>
        </section>
      </section>
      <AnimatePresence>
        {openLinks && <NavLinks setOpenLinks={setOpenLinks} />}
      </AnimatePresence>
    </main>
  );
}
