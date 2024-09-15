"use client";
import { useState } from "react";

export default function Reset({ security_key }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          email,
          password,
          secret_key: security_key,
        }),
      }
    );

    const json = await response.json();

    if (json.error) {
      setError(json.error);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setLoading(false);
    } else {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setError(null);
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#1f9065] text-white rounded-md p-3 mx-2 md:w-[60%] md:mx-auto">
      <header className="text-center text-lg font-semibold p-3 lg:text-xl">
        <h1>Complete account creation</h1>
      </header>
      <form
        onFocus={() => setError(false)}
        onSubmit={createAccount}
        className="flex flex-col gap-3 mx-auto w-fit my-5 sm:w-96"
      >
        <label htmlFor="firstName" className="font-semibold lg:text-xl">
          First name
        </label>
        <input
          id="firstName"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-white rounded-md p-2 outline-none text-black"
          placeholder="John"
        />
        <label htmlFor="lastName" className="font-semibold lg:text-xl">
          Last name
        </label>
        <input
          id="lastName"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          className="bg-white rounded-md p-2 outline-none text-black"
          placeholder="Doe"
        />
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
        <label htmlFor="password" className="font-semibold lg:text-xl">
          Password
        </label>
        <input
          id="password"
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
            <p>Create account</p>
          )}
        </button>
      </form>
    </main>
  );
}
