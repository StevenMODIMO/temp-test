"use client";
import Backdrop from "./Backdrop";
import { FaTimes } from "react-icons/fa";

interface VideoModalProps {
  url: string;
  onClose: () => void;
}

const extractVideoId = (url: string): string | null => {
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
};

export default function VideoModal({ url, onClose }: VideoModalProps) {
  const videoId = extractVideoId(url);

  if (!videoId) {
    return (
      <Backdrop>
        <div className="relative w-full max-w-lg mx-auto bg-white rounded shadow-lg p-4">
          <button
            onClick={onClose}
            className="absolute text-2xl text-gray-600 hover:text-gray-900"
          >
            <FaTimes />
          </button>
          <p className="text-center text-red-500">
            Invalid video URL. Please try again.
          </p>
        </div>
      </Backdrop>
    );
  }

  return (
    <Backdrop>
      <div className="mx-auto w-[90%] h-[90%] bg-white rounded shadow-lg">
        <button
          onClick={onClose}
          className="absolute text-2xl top-4 right-6 text-gray-800 bg-white p-1 rounded-full"
        >
          <FaTimes />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          className="w-full h-full rounded mx-auto"
          allowFullScreen
        />
      </div>
    </Backdrop>
  );
}
