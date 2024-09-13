"use client";
import { useState, useEffect } from "react";
import { regions } from "@/lib/regions";

export default function PrayerTimes() {
  const [times, setTimes] = useState({});
  const [selectedRegion, setSelectedRegion] = useState("");
  const [activePrayer, setActivePrayer] = useState("");

  useEffect(() => {
    const getPrayerTimes = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/prayer_times/"
      );
      const json = await response.json();

      if (response.ok) {
        setTimes(json);
      } else {
        console.log(json.error);
      }
    };
    getPrayerTimes();
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);

    // Array of prayer names to choose from
    const prayers = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

    // Randomly select one prayer to highlight
    const randomPrayer = prayers[Math.floor(Math.random() * prayers.length)];
    setActivePrayer(randomPrayer);
  };

  // Helper function to get styles based on whether the prayer is active
  const getPrayerStyles = (prayerName) => {
    const isActive = prayerName === activePrayer;
    return {
      backgroundColor: isActive ? "#1f9065" : "",
      color: isActive ? "white" : "#1f9065",
    };
  };

  return (
    <main className="my-3 lg:my-5">
      <section className="flex items-center gap-3 w-fit mx-auto">
        <select
          className="p-2 border rounded"
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="" disabled>
            Select a region
          </option>
          {regions.map((region, index) => (
            <option key={index} value={region.en}>
              {region.en}
            </option>
          ))}
        </select>
        <main className="rounded-full shadow-2xl p-2">
          <div
            className="border border-[#1f9065] rounded-full w-16 h-16 flex flex-col items-center justify-center p-3"
            style={getPrayerStyles("fajr")}
          >
            <p className="font-bold">{times?.fajr}</p>
            <p className="text-[10px]">Morning</p>
          </div>
        </main>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <main className="rounded-full shadow-2xl p-2">
          <div
            className="drop-shadow-lg border border-[#1f9065] rounded-full w-16 h-16 flex flex-col items-center justify-center p-3"
            style={getPrayerStyles("sunrise")}
          >
            <p className="font-bold">{times?.sunrise}</p>
            <p className="text-[10px]">The sun</p>
          </div>
        </main>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <main className="rounded-full shadow-2xl p-2">
          <div
            className="drop-shadow-lg border border-[#1f9065] rounded-full w-16 h-16 flex flex-col items-center justify-center p-3"
            style={getPrayerStyles("dhuhr")}
          >
            <p className="font-bold">{times?.dhuhr}</p>
            <p className="text-[10px]">Before</p>
          </div>
        </main>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <main className="rounded-full shadow-2xl p-2">
          <div
            className="drop-shadow-lg border border-[#1f9065] rounded-full w-16 h-16 flex flex-col items-center justify-center p-3"
            style={getPrayerStyles("asr")}
          >
            <p className="font-bold">{times?.asr}</p>
            <p className="text-[10px]">century</p>
          </div>
        </main>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <main className="rounded-full shadow-2xl p-2">
          <div
            className="bg-[#1f9065] text-white rounded-full w-16 h-16 flex flex-col items-center justify-center p-3"
            style={getPrayerStyles("maghrib")}
          >
            <p className="font-bold">{times?.maghrib}</p>
            <p className="text-[10px]">evening</p>
          </div>
        </main>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <main className="rounded-full shadow-2xl p-2">
          <div
            className="drop-shadow-lg border border-[#1f9065] rounded-full w-16 h-16 flex flex-col items-center justify-center p-3"
            style={getPrayerStyles("isha")}
          >
            <p className="font-bold">{times?.isha}</p>
            <p className="text-[10px]">Hufton</p>
          </div>
        </main>
      </section>
    </main>
  );
}
