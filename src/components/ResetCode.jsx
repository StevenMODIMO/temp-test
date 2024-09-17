"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ResetCode({ setCode, updateEmail }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["login"]);

  const sendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://backfatvo.salyam.uz/api_v1/auth/reset_password/send_code/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const json = await response.json();

    if (json.error) {
      setError(json.error);
      setEmail("");
      setLoading(false);
    } else {
      setCode("12345");
      updateEmail(email)
      setEmail("");
      setError(null);
      setLoading(false);
    }
  };
  return (
    <main className="bg-[#1f9065] text-white rounded-md p-3 mx-2 md:w-[60%] md:mx-auto">
      <header className="text-center text-lg font-semibold p-3 lg:text-xl">
        <h1>{t("resetEnter")}</h1>
      </header>
      <form
        onFocus={() => setError(false)}
        onSubmit={sendCode}
        className="flex flex-col gap-3 mx-auto w-fit my-5 sm:w-96"
      >
        <label htmlFor="email" className="font-semibold lg:text-xl">
          {t("email")}
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white rounded-md p-2 outline-none text-black"
          placeholder="user@example.com"
        />
        <button className="bg-white font-semibold rounded-md p-2 text-[#1f9065] mx-auto">
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="h-5 w-5 animate-spin border-4 border-t-transparent border-[#1f9065] rounded-full"></div>
              <p>{t("loader")}</p>
            </div>
          ) : (
            <p>{t("sendCode")}</p>
          )}
        </button>
      </form>
      {error && (
        <div className="text-red-400 text-center font-smibold">{error}</div>
      )}
    </main>
  );
}
