"use client";
import Image from "next/image";
import banner from "@/public/banner.svg";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import BannerSearch from "./BannerSearch";
import fatvo from "@/public/fatvo.png";

export default function Banner() {
  return (
    <main className="relative w-full h-[400px] text-gray-200">
      <Image
        fill
        alt="Banner"
        src={banner}
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 flex flex-col items-start justify-center bg-black bg-opacity-50 p-5">
        <div className="flex items-center mb-2 w-full justify-between">
          <h1 className="text-3xl font-bold mb-2 w-64 sm:w-72 sm:mt-2 md:w-96 md:text-4xl lg:w-[600px] lg:text-5xl">
            Fatwa center of the Office of Muslims of Uzbekistan
          </h1>
          <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
        <div className="flex flex-col gap-4 p-1">
          <Link
            href="/send-question"
            className="p-2 flex gap-2 items-center border border-[#1f9065] rounded-full"
          >
            <h4>The question is yes</h4>
            <MdOutlineArrowOutward />
          </Link>
          <BannerSearch />
        </div>
      </div>
    </main>
  );
}
