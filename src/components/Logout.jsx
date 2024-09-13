"use client";
import Backdrop from "./Backdrop";

export default function Logout({ logout, setLogoutModal }) {
  return (
    <Backdrop>
      <section className="bg-white h-40 w-80 rounded shadow-lg">
        <header className="text-[#1f9065] text-center mt-3">
          <h1>Are you sure you want to logout</h1>
        </header>
        <div className="flex justify-center gap-3 mt-10">
          <button
            onClick={() => setLogoutModal(false)}
            className="p-1 rounded text-white bg-[#1f9065]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              logout();
              setLogoutModal(false);
            }}
            className="p-1 rounded border border-[#1f9065]"
          >
            Logout
          </button>
        </div>
      </section>
    </Backdrop>
  );
}
