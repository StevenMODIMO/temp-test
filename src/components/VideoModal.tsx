"use client";
import Backdrop from "./Backdrop";

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
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            &times;
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
      <div className="relative w-full max-w-lg mx-auto bg-white rounded shadow-lg p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          className="w-full h-64 rounded"
          allowFullScreen
        />
      </div>
    </Backdrop>
  );
}
