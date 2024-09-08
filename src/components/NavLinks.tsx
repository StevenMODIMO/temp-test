"use client";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { x: -1200 },
  visible: {
    x: 0,
    transition: {
      ease: "easeInOut",
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: {
    x: -1200,
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};

interface NavlinksProps {
  setOpenLinks: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavLinks({ setOpenLinks }: NavlinksProps) {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-10 bg-[#1f9065] h-full absolute top-14 left-0 p-2 flex flex-col gap-2 w-[50%] md:hidden"
    >
      {navLinks.map(({ id, title, route }) => {
        return (
          <main key={id}>
            <Link onClick={() => setOpenLinks(false)} href={route}>
              {title}
            </Link>
          </main>
        );
      })}
    </motion.main>
  );
}
