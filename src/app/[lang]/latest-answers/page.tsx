import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My questions",
  description: "View you personal questions for answers",
};

import MyQuestions from "@/components/MyQuestions";

export default function LatestAnswers() {
  return (
    <main>
      <MyQuestions />
    </main>
  );
}
