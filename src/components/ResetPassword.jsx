"use cilent";
import { useState } from "react";
import Backdrop from "./Backdrop";
import ResetCode from "./ResetCode";
import ResetVerify from "./ResetVerify";
import Reset from "./Reset";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ResetPassword({ setOpenreset }) {
  const [code, setCode] = useState("");
  const [secret_key, setSecretKey] = useState("");
  const { t } = useTranslation(["login"]);
  const [uemail, updateEmail] = useState();
  return (
    <Backdrop>
      <main className="bg-gray-100 my-5 py-5 rounded-md w-[90%] mx-auto lg:w-[70%]">
        <div className="flex justify-end mx-12 w-fit cursor-pointer bg-[#1f9065] text-white p-2 rounded-full">
          <FaTimes onClick={() => setOpenreset(false)} />
        </div>
        <header className="text-center text-black text-xl font-semibold p-3 lg:text-2xl">
          <h1>{t("resetTitle")}</h1>
        </header>
        {!code && !secret_key ? (
          <ResetCode
            setCode={setCode}
            setOpenreset={setOpenreset}
            updateEmail={updateEmail}
          />
        ) : code && !secret_key ? (
          <ResetVerify
            setSecretKey={setSecretKey}
            setOpenreset={setOpenreset}
            uemail={uemail}
          />
        ) : secret_key ? (
          <Reset secret_key={secret_key} setOpenreset={setOpenreset} />
        ) : null}
      </main>
    </Backdrop>
  );
}
