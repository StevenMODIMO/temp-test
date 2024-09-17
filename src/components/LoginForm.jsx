"use client";
import Backdrop from "./Backdrop";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FaFacebook,
  FaRegEye,
  FaRegEyeSlash,
  FaTelegram,
} from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import ResetPassword from "./ResetPassword";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function LoginForm({ setOpenForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();
  const { t } = useTranslation(["login"]);
  const router = useRouter();
  const [openReset, setOpenreset] = useState(false);

  const getUser = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("user_tokens"));
      const accessToken = tokens?.access_token;

      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/user/profile/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        // Store user data in local storage and dispatch login action
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      } else {
        console.error("Error fetching user profile:", json.error);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the user profile:",
        error
      );
    }
  };

  const telegramAuth = async () => {
    const url = window.location.origin + window.location.pathname;

    const response = await fetch(
      "https://backfatvo.salyam.uz/api_v1/auth/telegram/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ redirect_url: url, debug: true }),
      }
    );

    const json = await response.json();

    if (json.url) {
      router.push(json.url);
    } else {
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/auth/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setEmail("");
        setPassword("");
        setLoading(false);
        setOpenForm(false);
        localStorage.setItem(
          "user_tokens",
          JSON.stringify({
            access_token: json.access,
            refresh_token: json.refresh,
          })
        );
        getUser();
      } else {
        setError(json.error);
        setLoading(false);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Backdrop>
      {openReset && <ResetPassword setOpenreset={setOpenreset} />}
      <main className="bg-white text-black rounded-t-xl w-[90%] sm:w-[70%] md:w-[60%]">
        <header className="px-3 flex justify-end text-xl py-3">
          <FaTimes onClick={() => setOpenForm(false)} />
        </header>
        <header className="text-center text-[22px] text-[#292929] font-semibold px-3 md:text-[40px]">
          <h1>{t("introduction")}</h1>
        </header>
        <section className="px-3 my-2 md:flex gap-2 md:w-fit md:mx-auto">
          <div
            onClick={() => signIn("google")}
            className="my-2 rounded-xl cursor-pointer flex gap-1 p-2 items-center justify-center border border-gray-200 hover:bg-gray-100 md:w-48"
          >
            <FcGoogle />
            <p className="text-gray-500">Google</p>
          </div>
          <div
            onClick={telegramAuth}
            className="my-2 rounded-xl cursor-pointer flex gap-1 p-2 items-center justify-center border border-gray-200 hover:bg-gray-100 md:w-48"
          >
            <FaTelegram className="text-blue-400" />
            <p className="text-gray-500">Telegram</p>
          </div>
        </section>
        <div className="flex justify-center text-gray-500 items-center gap-2 my-5 px-3 md:mx-auto">
          <div className="bg-gray-500 h-[2px] w-12"></div>
          <div>{t("withEmail")}</div>
          <div className="bg-gray-500 h-[2px] w-12"></div>
        </div>
        <form
          onSubmit={handleSubmit}
          onFocus={() => setError(null)}
          className="w-full flex flex-col gap-3 my-2 px-3 md:w-fit md:mx-auto"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              error
                ? "p-2 rounded-xl outline-gray-100 border border-red-400 lg:w-96"
                : "p-2 rounded-xl outline-gray-100 border border-gray-200 lg:w-96"
            }
            placeholder="Email"
          />
          <label
            htmlFor="password"
            className={
              error
                ? "flex justify-between items-center p-2 rounded-xl border border-red-400"
                : "flex justify-between items-center p-2 rounded-xl border border-gray-200"
            }
          >
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-xl outline-none lg:w-80"
            />
            {!showPassword ? (
              <FaRegEye onClick={() => setShowPassword(true)} />
            ) : (
              <FaRegEyeSlash onClick={() => setShowPassword(false)} />
            )}
          </label>
          {error && <div className="my-3 text-red-500">{error}</div>}
          <p
            onClick={() => setOpenreset(true)}
            className="cursor-pointer text-[#1f9065] text-sm text-center"
          >
            {t("forgotPassword")}
          </p>
          <button className="bg-[#1f9065] rounded-xl p-2 my-2 text-white">
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="h-5 w-5 animate-spin border-4 border-t-transparent border-white rounded-full"></div>
                <p>{t("loading")}</p>
              </div>
            ) : (
              <p>{t("signIn")}</p>
            )}
          </button>
        </form>
        <p className="px-3 text-xs text-center my-2 md:text-sm md:w-fit md:mx-auto">
          {t("haveAnAccount")}{" "}
          <span>
            <Link
              onClick={() => setOpenForm(false)}
              href="/registration"
              className="text-[#1f9065]"
            >
              {t("register")}
            </Link>
          </span>
        </p>
        <footer className="bg-[#1f9065] p-3 flex justify-between text-white px-3">
          <Link href="/terms-of-service">{t("terms")}</Link>
          <>Tashkent 2024</>
        </footer>
      </main>
    </Backdrop>
  );
}
