"use client";
import { useState } from "react";

export default function Reset({ secret_key }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAccount = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetch(
      "https://backfatvo.salyam.uz/api_v1/auth/reset_password/renew/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          secret_key: secret_key,
        }),
      }
    );

    const json = await response.json();

    if (json.error) {
      setError(json.error);
      setPassword("");
      setLoading(false);
    } else {
      setPassword("");
      setError(null);
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#1f9065] text-white rounded-md p-3 mx-2 md:w-[60%] md:mx-auto">
      <header className="text-center text-lg font-semibold p-3 lg:text-xl">
        <h1>Complete password recovery</h1>
      </header>
      <form
        onFocus={() => setError(false)}
        onSubmit={createAccount}
        className="flex flex-col gap-3 mx-auto w-fit my-5 sm:w-96"
      >
        <label htmlFor="password" className="font-semibold lg:text-xl">
          Password
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
              <p>loading</p>
            </div>
          ) : (
            <p>Change password</p>
          )}
        </button>
      </form>
    </main>
  );
}
