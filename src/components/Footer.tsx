"use client";
import { IoCallOutline } from "react-icons/io5";
import {
  CiMail,
  CiLocationOn,
  CiInstagram,
  CiYoutube,
  CiFacebook,
} from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import umma from "@/public/download.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="rounded-lg mx-5 my-4 bg-[#1f9065] text-gray-200 p-4 text-sm flex flex-col gap-4 md:grid grid-cols-3 lg:gap-8 lg:text-lg md:p-8 lg:p-12">
      <section className="flex flex-col gap-2">
        <h1>
          This site was created to master the Islamic sciences, not to get lost
          on this path, and to get the right answers to the questions of our
          compatriots.
        </h1>
        <Link href="/privacy-policy" className="text-sm md:text-[16px]">Privacy policy.</Link>
        <Link href="/terms-of-service" className="text-sm md:text-[16px]">Terms of service.</Link>
        <Link href="/user-data-deletion" className="text-sm md:text-[16px]">User data deletion.</Link>
        <Link href="/terms-of-service" className="text-sm md:text-[16px]">All rights reserved.</Link>
      </section>
      <section>
        <header className="font-bold">Contact us</header>
        <section className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <IoCallOutline className="text-lg" />
            <a href="tel:+7871503344" className="hover:text-white">
              (78) 150-33-44
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <CiMail className="text-lg" />
            <a href="mailto:fatvo.uz@mail.ru" className="hover:text-white">
              fatvo.uz@mail.ru
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <CiLocationOn className="text-lg" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Tashkent+city,+Almazor+district,+korasayor+street,+47"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Tashkent city, Almazor district, korasayor street, 47
            </a>
          </div>
        </section>
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <section className="flex items-center gap-2 cursor-pointer hover:text-white">
            <FaXTwitter className="text-2xl" />
            <Link href="https://x.com/fatvouz" target="_blank">
              Twitter
            </Link>
          </section>
          <section className="flex items-center gap-2 cursor-pointer hover:text-white">
            <CiInstagram className="text-2xl" />
            <Link href="https://www.instagram.com/fatvouz/" target="_blank">
              Instagram
            </Link>
          </section>
          <section className="flex items-center gap-2 cursor-pointer hover:text-white">
            <CiYoutube className="text-2xl" />
            <Link href="https://www.youtube.com/c/Fatvouzb" target="_blank">
              Youtube
            </Link>
          </section>
          <section className="flex items-center gap-2 cursor-pointer hover:text-white">
            <CiFacebook className="text-2xl" />
            <Link href="https://www.facebook.com/diniysavollar" target="_blank">
              Facebook
            </Link>
          </section>
          <section className="flex items-center gap-2 cursor-pointer hover:text-white">
            <FaTelegramPlane className="text-2xl" />
            <Link href="https://t.me/diniysavollar" target="_blank">
              Telegram
            </Link>
          </section>
          <section className="flex items-center relative gap-2 cursor-pointer hover:text-white">
            <div className="relative w-6 h-6">
              <Image src={umma} alt="umma" fill />
            </div>
            <Link href="https://ummalife.com/fatvouz" target="_blank">
              UmmaLife platform
            </Link>
          </section>
        </div>
      </section>
    </footer>
  );
}
