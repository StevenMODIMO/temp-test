"use client";
import Backdrop from "./Backdrop";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

export default function Attachment({ attached_file, setOpen }) {
  return (
    <Backdrop>
      <main className="relative w-[50%] h-[80%] rounded">
        <Image src={attached_file} alt="attachment" fill />
      </main>
      <FaTimes
        onClick={() => setOpen(false)}
        className="text-black bg-white text-3xl p-2 rounded-full absolute top-4"
      />
    </Backdrop>
  );
}
