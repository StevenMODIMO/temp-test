"use client";
import Backdrop from "./Backdrop";

export default function SendQuestion({ setOpen }) {
  return (
    <Backdrop>
      <main className="h-96 w-96 bg-white" onClick={() => setOpen(false)}>
        Send Question
      </main>
    </Backdrop>
  );
}
