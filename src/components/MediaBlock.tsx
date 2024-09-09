"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import VideoModal from "./VideoModal";


export default function MediaBlock() {
  const [media, setMedia] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  useEffect(() => {
    const getMedia = async () => {
      try {
        const response = await fetch(
          "https://backfatvo.salyam.uz/api_v1/media/latest/"
        );
        const json = await response.json();
        setMedia(json);
      } catch (error) {
        console.error("Failed to fetch media:", error);
      }
    };
    getMedia();
  }, []);

  const handleOpenModal = (url: string) => {
    setCurrentVideoUrl(url);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setCurrentVideoUrl("");
  };

  return (
    <main className="w-[95%] mx-auto bg-gray-100 rounded-md p-4 mt-3 cursor-pointer">
      <header>
        <h1 className="font-bold text-lg text-gray-800 p-2 lg:text-3xl">
          Fatvo.uz <span className="text-[#1f9065]">Media</span>
        </h1>
      </header>
      <section className="flex flex-col items-center md:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {media.map(({ id, title, image, url, view }) => (
          <div
            key={id}
            className="group relative"
            onClick={() => handleOpenModal(url)}
          >
            <div className="relative overflow-hidden w-56 h-40 rounded-xl">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:brightness-75 transition duration-300"
              />
              <FaRegCirclePlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            <h1 className="text-gray-500 text-xl mt-2">{title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex gap-1 items-center">
                <p>Youtube</p>
                <IoEyeOutline />
              </div>
              <p>{view}</p>
            </div>
          </div>
        ))}
      </section>
      {modal && <VideoModal url={currentVideoUrl} onClose={handleCloseModal} />}
    </main>
  );
}
