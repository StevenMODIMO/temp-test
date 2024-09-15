"use client";
import Image from "next/image";
import banner from "@/public/banner.svg";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import BannerSearch from "./BannerSearch";
import SendQuestion from "./SendQuestion";
import LoginForm from "./LoginForm";
import fatvo from "@/public/fatvo.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

export default function Banner() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleOpenModal = () => {
    if (user) {
      setOpen(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <main className="relative w-full h-[400px] text-gray-200">
      {open &&
        (user ? (
          <SendQuestion setOpen={setOpen} />
        ) : (
          <LoginForm setOpenForm={setOpen} />
        ))}
      <Image
        fill
        alt="Banner"
        src={banner}
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 flex flex-col items-start justify-center bg-black bg-opacity-50 p-5">
        <div className="flex items-center mb-2 w-full justify-between">
          <h1 className="text-3xl font-bold mb-2 w-64 sm:w-72 sm:mt-2 md:w-96 md:text-4xl lg:w-[600px] lg:text-6xl">
            {t("banner_title")}
          </h1>
          <div className="relative w-40 h-40 slow-spin md:mr-16 lg:mr-28">
            <Image fill src={fatvo} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-1 sm:flex-row">
          <button
            onClick={handleOpenModal}
            className="p-3 flex gap-2 items-center border border-[#1f9065] rounded-[32px]"
          >
            <h4>{user ? `${t("sendQuestion")}` : `${t("sendQuestion")}`}</h4>
            <MdOutlineArrowOutward />
          </button>
          <BannerSearch />
        </div>
      </div>
    </main>
  );
}
