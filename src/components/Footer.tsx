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
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#1f9065] text-gray-200 p-4 text-sm flex flex-col gap-4 md:grid grid-cols-3 lg:gap-8 lg:text-lg md:p-8 lg:p-12">
      <section className="flex flex-col gap-2">
        <h1>
          This site was created to master the Islamic sciences, not to get lost
          on this path, and to get the right answers to the questions of our
          compatriots.
        </h1>
        <h2 className="font-bold">All rights reserved.</h2>
      </section>
      <section>
        <header className="font-bold">Contact us</header>
        <section className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <IoCallOutline className="text-lg" />
            <p>(78) 150-33-44</p>
          </div>
          <div className="flex gap-2 items-center">
            <CiMail className="text-lg" />
            <p>fatvo.uz@mail.ru</p>
          </div>
          <div className="flex gap-2 items-center">
            <CiLocationOn className="text-lg" />
            <p>Tashkent city,Almazor district, korasayor street,47</p>
          </div>
        </section>
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex gap-3">
          <FaXTwitter className="text-2xl" />
          <CiInstagram className="text-2xl" />
          <CiYoutube className="text-2xl" />
          <CiFacebook className="text-2xl" />
          <FaTelegramPlane className="text-2xl" />
        </div>
        <div className="rounded border border-gray-200 flex items-center justify-center p-2">
          <p>Subscribe to news</p>
          <MdOutlineArrowOutward />
        </div>
      </section>
    </footer>
  );
}
