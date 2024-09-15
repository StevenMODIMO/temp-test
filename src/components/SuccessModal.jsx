"use client";
import Backdrop from "./Backdrop";
import { FaTimes } from "react-icons/fa";
import { CiInstagram, CiYoutube, CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import umma from "@/public/download.png";
import Image from "next/image";

export default function SuccessModal({ setOpenModal, setOpen }) {
  return (
    <Backdrop>
      <main className="flex flex-col gap-3 bg-white text-black rounded-t-xl w-[90%] sm:w-[70%] md:w-[35%]">
        <div className="flex justify-end mt-2 mr-2">
          <FaTimes
            onClick={() => {
              setOpenModal(false);
              setOpen(false);
            }}
            className="bg-[#1f9065] p-1 cursor-pointer text-xl rounded-full text-white"
          />
        </div>
        <header className="text-3xl font-semibold text-[#1f9065] text-center">
          <h1>Question sent!</h1>
        </header>
        <p className="text-center mt-3 text-lg font-bold">
          Follow us on social networks for new topics and answers
        </p>
        <footer>
          <section className="flex justify-center gap-3 p-2">
            <div className="flex flex-col gap-3 md:flex-row">
              <section className="flex items-center gap-2 cursor-pointer">
                <Link href="https://x.com/fatvouz" target="_blank">
                  <FaXTwitter className="text-2xl" />
                </Link>
              </section>
              <section className="flex items-center gap-2 cursor-pointer">
                <Link href="https://www.instagram.com/fatvouz/" target="_blank">
                  <CiInstagram className="text-2xl" />
                </Link>
              </section>
              <section className="flex items-center gap-2 cursor-pointer">
                <Link href="https://www.youtube.com/c/Fatvouzb" target="_blank">
                  <CiYoutube className="text-2xl" />
                </Link>
              </section>
              <section className="flex items-center gap-2 cursor-pointer">
                <Link
                  href="https://www.facebook.com/diniysavollar"
                  target="_blank"
                >
                  <CiFacebook className="text-2xl" />
                </Link>
              </section>
              <section className="flex items-center gap-2 cursor-pointer">
                <Link href="https://t.me/diniysavollar" target="_blank">
                  <FaTelegramPlane className="text-2xl" />
                </Link>
              </section>
              <section className="flex items-center relative gap-2 cursor-pointer">
                <Link href="https://ummalife.com/fatvouz" target="_blank">
                  <div className="relative w-6 h-6">
                    <Image src={umma} alt="umma" fill />
                  </div>
                </Link>
              </section>
            </div>
          </section>
        </footer>
      </main>
    </Backdrop>
  );
}
