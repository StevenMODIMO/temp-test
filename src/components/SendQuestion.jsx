"use client";
import { useState } from "react";
import Backdrop from "./Backdrop";
import SuccessModal from "./SuccessModal";
import { FaTimes } from "react-icons/fa";
import { RiAttachment2 } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

export default function SendQuestion({ setOpen }) {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();

  const sendQuestion = async (e) => {
    e.preventDefault();

    setLoading(true);
    const tokens = JSON.parse(localStorage.getItem("user_tokens"));
    const access = tokens?.access_token;

    const formData = new FormData();
    formData.append("first_name", name);
    formData.append("question", question);
    formData.append("attached_file", file);
    const response = await fetch(
      "https://backfatvo.salyam.uz/api_v1/send_question/",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setName("");
      setQuestion("");
      setFile("");
      setError(null);
      setLoading(false);
      setOpenModal(true);
    } else {
      setName("");
      setQuestion("");
      setFile("");
      console.log(json.question[0]);
      setError(json.question[0]);
      setLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <Backdrop>
      {openModal && (
        <SuccessModal setOpenModal={setOpenModal} setOpen={setOpen} />
      )}
      <main className="bg-white text-black rounded-t-xl w-[90%] sm:w-[70%] md:w-[60%]">
        <div className="flex justify-end mt-2 mr-2">
          <FaTimes
            onClick={() => setOpen(false)}
            className="bg-[#1f9065] p-1 cursor-pointer text-xl rounded-full text-white"
          />
        </div>
        <header className="text-3xl font-semibold text-[#1f9065] text-center">
          <h1>Ask question</h1>
        </header>
        <form
          onSubmit={sendQuestion}
          onFocus={() => setError(null)}
          className="flex flex-col gap-3 my-2 px-3  w-[70%] mx-auto"
        >
          <label htmlFor="name" className="text-lg font-semibold">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={
              error
                ? "p-2 rounded-xl outline-gray-100 border border-red-400"
                : "p-2 rounded-xl outline-gray-100 border border-gray-200"
            }
          />
          <label htmlFor="question" className="text-lg font-semibold">
            Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={
              error
                ? "h-40 p-2 rounded-xl outline-gray-100 border border-red-400"
                : "h-40 p-2 rounded-xl outline-gray-100 border border-gray-200"
            }
          ></textarea>
          <label
            htmlFor="file"
            className="cursor-pointer bg-[#1f9065] rounded text-lg flex items-center justify-center gap-2 text-white p-2"
          >
            <RiAttachment2 />
            <p>Attach file</p>
          </label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          <button className="text-white w-fit p-2 mx-auto rounded bg-[#1f9065]">
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="h-5 w-5 animate-spin border-4 border-t-transparent border-white rounded-full"></div>
                <p>loading</p>
              </div>
            ) : (
              " Send question"
            )}
          </button>
        </form>
        {error && (
          <div className="text-red-500 mx-auto w-fit text-lg p-3 font-semibold">
            {error}
          </div>
        )}
        <footer className="bg-[#1f9065] p-3 flex justify-between text-white px-3">
          <p>Terms of use</p>
          <p>Tashkent 2024</p>
        </footer>
      </main>
    </Backdrop>
  );
}
