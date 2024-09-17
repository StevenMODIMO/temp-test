"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function ResetVerify({ setSecretKey, uemail }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation(["login"]);

  const VerifyCode = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetch(
      "https://backfatvo.salyam.uz/api_v1/auth/reset_password/verify_code/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      }
    );

    const json = await response.json();

    if (json.error) {
      setError(json.error);
      setEmail("");
      setCode("");
      setLoading(false);
    } else {
      setSecretKey(json.secret_key);
      setEmail("");
      setCode("");
      setError(null);
      setLoading(false);
    }
  };
  return (
    <main className="bg-[#1f9065] text-white rounded-md p-3 mx-2 md:w-[60%] md:mx-auto">
      <header className="text-center text-lg font-semibold p-3 lg:text-xl">
        <h1>{t("verifyTitle")}</h1>
      </header>
      <form
        onFocus={() => setError(false)}
        onSubmit={VerifyCode}
        className="flex flex-col gap-3 mx-auto w-fit my-5 sm:w-96"
      >
        <div className="font-semibold lg:text-xl p-2 cursor-pointer rounded-md text-gray-500 bg-white">
          {uemail}
        </div>
        <label htmlFor="code" className="font-semibold lg:text-xl">
          {t("code")}
        </label>
        <input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-white rounded-md p-2 outline-none text-black"
          placeholder="enter code"
        />
        <button className="bg-white font-semibold rounded-md p-2 text-[#1f9065] mx-auto">
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="h-5 w-5 animate-spin border-4 border-t-transparent border-[#1f9065] rounded-full"></div>
              <p>{t("loader")}</p>
            </div>
          ) : (
            <p>{t("resetVerify")}</p>
          )}
        </button>
      </form>
      {error && (
        <div className="text-red-400 text-center font-smibold">{error}</div>
      )}
    </main>
  );
}
