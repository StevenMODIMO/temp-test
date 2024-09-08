import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "zbekiston musulmonlar idorasi fatvo markazi",
};

import Banner from "@/components/Banner";
import RegionSelection from "@/components/RegionSelection";

export default function Home() {
  return (
    <div>
      <Banner />
      <RegionSelection />
    </div>
  );
}
