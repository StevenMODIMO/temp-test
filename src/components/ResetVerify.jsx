"use client";

import { useState } from "react";

export default function ResetVerify({ setSecuritykey }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const VerifyCode = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetch(
      "https://backfatvo.salyam.uz/api_v1/register/verify_code/",
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
      setSecuritykey(json.secret_key);
      setEmail("");
      setCode("");
      setError(null);
      setLoading(false);
    }
  };
  return (
    <main className="bg-[#1f9065] text-white rounded-md p-3 mx-2 md:w-[60%] md:mx-auto">
      <header className="text-center text-lg font-semibold p-3 lg:text-xl">
        <h1>Verify code</h1>
      </header>
      <form
        onFocus={() => setError(false)}
        onSubmit={VerifyCode}
        className="flex flex-col gap-3 mx-auto w-fit my-5 sm:w-96"
      >
        <label htmlFor="email" className="font-semibold lg:text-xl">
          Email
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white rounded-md p-2 outline-none text-black"
          placeholder="user@example.com"
        />
        <label htmlFor="code" className="font-semibold lg:text-xl">
          Code
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
              <p>loading</p>
            </div>
          ) : (
            <p>Verify</p>
          )}
        </button>
      </form>
      {error && (
        <div className="text-red-400 text-center font-smibold">{error}</div>
      )}
    </main>
  );
}
