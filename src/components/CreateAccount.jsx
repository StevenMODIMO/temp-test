"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation"

export default function CreateAccount({ security_key, uemail }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation(["registration"]);
  const router = useRouter()

  const createAccount = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetch(
      "https://backfatvo.salyam.uz/api_v1/register/create_account/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email: uemail,
          password,
          secret_key: security_key,
        }),
      }
    );

    const json = await response.json();

    if (json.error) {
      setError(json.error);
      setFirstName("");
      setLastName("");
      setPassword("");
      setLoading(false);
    } else {
      setFirstName("");
      setLastName("");
      setPassword("");
      setError(null);
      setLoading(false);
      router.push("/")
    }
  };

  return (
    <main className="bg-[#1f9065] text-white rounded-md p-3 mx-2 md:w-[60%] md:mx-auto">
      <header className="text-center text-lg font-semibold p-3 lg:text-xl">
        <h1>{t("completeAccount")}</h1>
      </header>
      <form
        onFocus={() => setError(false)}
        onSubmit={createAccount}
        className="flex flex-col gap-3 mx-auto w-fit my-5 sm:w-96"
      >
        <label htmlFor="firstName" className="font-semibold lg:text-xl">
          {t("firstName")}
        </label>
        <input
          id="firstName"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-white rounded-md p-2 outline-none text-gray-500"
          placeholder={t("john")}
        />
        <label htmlFor="lastName" className="font-semibold lg:text-xl">
          {t("lastName")}
        </label>
        <input
          id="lastName"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          className="bg-white rounded-md p-2 outline-none text-black"
          placeholder={t("doe")}
        />
        <label htmlFor="lastName" className="font-semibold lg:text-xl">
          {t("email")}
        </label>
        <div className="font-semibold lg:text-xl p-2 cursor-pointer rounded-md text-black bg-white">
          {uemail}
        </div>
        <label htmlFor="password" className="font-semibold lg:text-xl">
          {t("password")}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white rounded-md p-2 outline-none text-black"
          placeholder="strong password"
        />
        <button className="bg-white font-semibold rounded-md p-2 text-[#1f9065] mx-auto">
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="h-5 w-5 animate-spin border-4 border-t-transparent border-[#1f9065] rounded-full"></div>
              <p>{t("loader")}</p>
            </div>
          ) : (
            <p>{t("createButton")}</p>
          )}
        </button>
      </form>
    </main>
  );
}
