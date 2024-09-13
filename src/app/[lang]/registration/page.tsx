import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration",
  description: "New users registration page",
};

import Register from "@/components/Registration";

export default function Registration() {
  return (
    <main>
        <Register />
    </main>
  );
}
