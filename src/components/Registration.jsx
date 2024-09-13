"use client";
import { useState } from "react";
import SendCode from "./SendCode";
import VerifyCode from "./VerifyCode";
import CreateAccount from "./CreateAccount";

export default function Register() {
  const [code, setCode] = useState("");
  const [security_key, setSecurityKey] = useState("");

  return (
    <main className="bg-gray-100 my-5 py-5 rounded-md w-[90%] mx-auto lg:w-[70%]">
      <header className="text-center text-xl font-semibold p-3 lg:text-2xl">
        <h1>Create an account</h1>
      </header>
      {!code && !security_key ? (
        <SendCode setCode={setCode} />
      ) : code && !security_key ? (
        <VerifyCode setSecuritykey={setSecurityKey} />
      ) : security_key ? (
        <CreateAccount security_key={security_key} />
      ) : null}
    </main>
  );
}
