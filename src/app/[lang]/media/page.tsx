import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media",
  description: "Learn from interactive videos",
};

import MediaBlock from "@/components/MediaBlock";

export default function Media() {
  return (
    <main className="lg:max-w-[70%] lg:mx-auto">
      <MediaBlock />
    </main>
  );
}
