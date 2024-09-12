"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BackdropProps {
  children: ReactNode; // Define the type for children
}

export default function Backdrop({ children }: BackdropProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="transition-all fixed z-[999] top-0 left-0 right-0 bottom-0 backdrop-blur bg-[#292929c4] flex justify-center items-center"
    >
      {children}
    </motion.main>
  );
}
