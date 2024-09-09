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
      className="flex items-center justify-center bg-[rgb(0,0,0,0.4)] fixed top-0 left-0 h-full w-full"
    >
      {children}
    </motion.main>
  );
}
