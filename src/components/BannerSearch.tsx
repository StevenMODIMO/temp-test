"use client";
import { useState, useEffect } from "react";

export default function BannerSearch() {
  const [search, setSearch] = useState("");
  return (
    <main>
      <form>
        <label htmlFor="search">
          <input
            className="rounded-full p-2 outline-none border border-[#1f9065] bg-black/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Searching ..."
          />
        </label>
      </form>
    </main>
  );
}
