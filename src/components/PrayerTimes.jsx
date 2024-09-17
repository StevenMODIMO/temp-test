"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function PrayerTimes() {
  const [regions, setRegions] = useState({ regions: [], default: null });
  const [times, setTimes] = useState({});
  const [selectedRegion, setSelectedRegion] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const countdownRef = useRef(null);
  const { t, i18n } = useTranslation(["prayer"]);

  useEffect(() => {
    const getRegions = async () => {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/prayer_times/regions/",
        {
          headers: {
            "Accept-Language":
              i18n.language === "uz-Cyrl" ? "uz-cyr" : i18n.language,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setRegions(json);
        // Check if there is a previously selected region in localStorage
        const storedRegion = localStorage.getItem("selectedRegion");
        if (storedRegion) {
          setSelectedRegion(storedRegion);
          getTimes(storedRegion);
        } else if (json.default) {
          setSelectedRegion(json.default);
          getTimes(json.default);
        }
      } else {
        console.log(json.error);
      }
    };
    getRegions();
  }, []);

  const getTimes = async (regionId) => {
    function getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    const todayDate = getTodayDate();
    const response = await fetch(
      `https://backfatvo.salyam.uz/api_v1/prayer_times/daily/?date=${todayDate}&region_id=${regionId}`,
      {
        headers: {
          "Accept-Language":
            i18n.language === "uz-Cyrl" ? "uz-cyr" : i18n.language,
        },
      }
    );
    const timesData = await response.json();

    if (response.ok) {
      setTimes(timesData.data);
      resetCountdown(); // Reset countdown when new region is selected
      startCountdown(timesData.data); // Start countdown for the new region
    } else {
      console.log(timesData.error);
    }
  };

  const handleChange = (event) => {
    const regionId = event.target.value;
    setSelectedRegion(regionId);
    // Store selected region in localStorage
    localStorage.setItem("selectedRegion", regionId);
    getTimes(regionId);
  };

  const resetCountdown = () => {
    // Clear any existing interval and reset timeLeft state
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    setTimeLeft("");
  };

  const getTimeInSeconds = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60;
  };

  const startCountdown = (prayerTimes) => {
    const prayerSequence = [
      "fajr",
      "sunrise",
      "dhuhr",
      "asr",
      "maghrib",
      "isha",
    ];

    // Current time in seconds
    const now = new Date();
    const nowInSeconds =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    // Find the next prayer time
    const prayerTimesInSeconds = prayerSequence.map((prayer) => {
      return getTimeInSeconds(prayerTimes[prayer]);
    });

    let nextPrayerTimeInSeconds = null;

    for (let i = 0; i < prayerTimesInSeconds.length; i++) {
      if (prayerTimesInSeconds[i] > nowInSeconds) {
        nextPrayerTimeInSeconds = prayerTimesInSeconds[i];
        break;
      }
    }

    // If no prayer is left for the day, set next to the first prayer of tomorrow
    if (nextPrayerTimeInSeconds === null) {
      nextPrayerTimeInSeconds = prayerTimesInSeconds[0] + 24 * 3600;
    }

    countdownRef.current = setInterval(() => {
      const currentTime = new Date();
      const currentInSeconds =
        currentTime.getHours() * 3600 +
        currentTime.getMinutes() * 60 +
        currentTime.getSeconds();

      const timeDifference = nextPrayerTimeInSeconds - currentInSeconds;

      if (timeDifference <= 0) {
        clearInterval(countdownRef.current);
        // Optionally trigger next prayer fetching here
      } else {
        setTimeLeft(formatTime(timeDifference));
      }
    }, 1000);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  return (
    <main className="flex items-center mx-auto gap-48 w-[80%] my-10">
      <main className="flex items-center gap-3 lg:ml-8">
        <div className="flex items-center justify-center text-[#1f9065] text-xs h-24 w-24 rounded-full shadow-md p-1">
          <div
            className={
              times.active === "fajr"
                ? "border border-white bg-[#1f9065] text-white rounded-full h-full w-full flex flex-col items-center justify-center"
                : "bg-white border border-[#1f9065] rounded-full h-full w-full flex flex-col items-center justify-center"
            }
          >
            <p className="font-bold">
              {times.fajr ? times.fajr.slice(0, 5) : "--:--"}
            </p>
            <p className="text-[15px]">{t("fajr")}</p>
            {times.active === "fajr" && <p className="text-xs">{timeLeft}</p>}
          </div>
        </div>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <div className="flex items-center justify-center text-[#1f9065] text-xs h-24 w-24 rounded-full shadow-md p-1">
          <div
            className={
              times.active === "sunrise"
                ? "border border-white bg-[#1f9065] text-white rounded-full h-full w-full flex flex-col items-center justify-center"
                : "bg-white border border-[#1f9065] rounded-full h-full w-full flex flex-col items-center justify-center"
            }
          >
            <p>{times.sunrise ? times.sunrise.slice(0, 5) : "--:--"}</p>
            <p className="text-[15px]">{t("sunrise")}</p>

            {times.active === "sunrise" && (
              <p className="text-xs">{timeLeft}</p>
            )}
          </div>
        </div>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <div className="flex items-center justify-center text-[#1f9065] text-xs h-24 w-24 rounded-full shadow-md p-1">
          <div
            className={
              times.active === "dhuhr"
                ? "border border-white bg-[#1f9065] text-white rounded-full h-full w-full flex flex-col items-center justify-center"
                : "bg-white border border-[#1f9065] rounded-full h-full w-full flex flex-col items-center justify-center"
            }
          >
            <p>{times.dhuhr ? times.dhuhr.slice(0, 5) : "--:--"}</p>
            <p className="text-[15px]">{t("dhuhr")}</p>

            {times.active === "dhuhr" && <p className="text-xs">{timeLeft}</p>}
          </div>
        </div>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <div className="flex items-center justify-center text-[#1f9065] text-xs h-24 w-24 rounded-full shadow-md p-1">
          <div
            className={
              times.active === "asr"
                ? "border border-white bg-[#1f9065] text-white rounded-full h-full w-full flex flex-col items-center justify-center"
                : "bg-white border border-[#1f9065] rounded-full h-full w-full flex flex-col items-center justify-center"
            }
          >
            <p>{times.asr ? times.asr.slice(0, 5) : "--:--"}</p>
            <p className="text-[15px]">{t("asr")}</p>

            {times.active === "asr" && <p className="text-xs">{timeLeft}</p>}
          </div>
        </div>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <div className="flex items-center justify-center text-[#1f9065] text-xs h-24 w-24 rounded-full shadow-md p-1">
          <div
            className={
              times.active === "maghrib"
                ? "border border-white bg-[#1f9065] text-white rounded-full h-full w-full flex flex-col items-center justify-center"
                : "bg-white border border-[#1f9065] rounded-full h-full w-full flex flex-col items-center justify-center"
            }
          >
            <p>{times.maghrib ? times.maghrib.slice(0, 5) : "--:--"}</p>
            <p className="text-[15px]">{t("maghrib")}</p>

            {times.active === "maghrib" && (
              <p className="text-xs">{timeLeft}</p>
            )}
          </div>
        </div>
        <div className="w-8 lg:w-16 h-[1px] flex items-center justify-around bg-gray-400">
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
          <div className="h-3 relative w-[1px] bg-gray-400"></div>
        </div>
        <div className="flex items-center justify-center text-[#1f9065] text-xs h-24 w-24 rounded-full shadow-md p-1">
          <div
            className={
              times.active === "isha"
                ? "border border-white bg-[#1f9065] text-white rounded-full h-full w-full flex flex-col items-center justify-center"
                : "bg-white border border-[#1f9065] rounded-full h-full w-full flex flex-col items-center justify-center"
            }
          >
            <p>{times.isha ? times.isha.slice(0, 5) : "--:--"}</p>
            <p className="text-[15px]">{t("isha")}</p>

            {times.active === "isha" && <p className="text-xs">{timeLeft}</p>}
          </div>
        </div>
      </main>
      <select
        value={selectedRegion}
        onChange={handleChange}
        className="outline-none p-2 w-36 rounded-md"
      >
        {regions.regions.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </main>
  );
}
