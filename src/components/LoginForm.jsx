"use client";
import Backdrop from "./Backdrop";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm({ setOpenForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();

  const getUser = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("user_tokens"));
      const access = tokens?.access_token;

      if (!access) {
        console.error("Access token not found");
        return;
      }

      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/user/profile/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
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
      <main className="bg-white text-black rounded-t-xl w-[90%] sm:w-[70%] md:w-[60%]">
        <header className="px-3 flex justify-end text-xl py-3">
          <FaTimes onClick={() => setOpenForm(false)} />
        </header>
        <header className="text-center text-[22px] text-[#292929] font-semibold px-3 md:text-[40px]">
          <h1>Sign in</h1>
        </header>
        <section className="px-3 my-2 md:flex gap-2 md:w-fit md:mx-auto">
          <div
            onClick={() => signIn("google")}
            className="my-2 rounded-xl cursor-pointer flex gap-1 p-2 items-center justify-center border border-gray-200 hover:bg-gray-100 md:w-56"
          >
            <FcGoogle />
            <p className="text-gray-500">Google</p>
          </div>
          <div className="my-2 rounded-xl cursor-pointer flex gap-1 p-2 items-center justify-center border border-gray-200 hover:bg-gray-100 md:w-56">
            <FaFacebook className="text-white bg-blue-500" />
            <p className="text-gray-500">Facebook</p>
          </div>
        </section>
        <div className="flex justify-center text-gray-500 items-center gap-2 my-5 px-3 md:mx-auto">
          <div className="bg-gray-500 h-[2px] w-12"></div>
          <div>By e-mail</div>
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
                ? "p-2 rounded-xl outline-gray-100 border border-red-400"
                : "p-2 rounded-xl outline-gray-100 border border-gray-200"
            }
            placeholder="Email"
          />
          <label htmlFor="password" className="flex justify-end">
            {!showPassword ? (
              <FaRegEye onClick={() => setShowPassword(true)} />
            ) : (
              <FaRegEyeSlash onClick={() => setShowPassword(false)} />
            )}
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              error
                ? "p-2 rounded-xl outline-gray-100 border border-red-400"
                : "p-2 rounded-xl outline-gray-100 border border-gray-200"
            }
            placeholder="Password"
          />
          {error && <div className="my-3 text-red-500">{error}</div>}
          <p className="text-[#1f9065] text-sm text-center">
            Have you forgotten your password
          </p>
          <button className="bg-[#1f9065] rounded-xl p-2 my-2 text-white">
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="h-5 w-5 animate-spin border-4 border-t-transparent border-white rounded-full"></div>
                <p>loading</p>
              </div>
            ) : (
              <p>Introduction</p>
            )}
          </button>
        </form>
        <p className="px-3 text-xs text-center my-2 md:text-sm md:w-fit md:mx-auto">
          Don't have an account?{" "}
          <span>
            <Link
              onClick={() => setOpenForm(false)}
              href="/registration"
              className="text-[#1f9065]"
            >
              Registration
            </Link>
          </span>
        </p>
        <footer className="bg-[#1f9065] p-3 flex justify-between text-white px-3">
          <p>Terms of use</p>
          <p>Tashkent 2024</p>
        </footer>
      </main>
    </Backdrop>
  );
}
