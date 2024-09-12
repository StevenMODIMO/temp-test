import { Metadata } from "next";

interface PrivacyTypes {
  slug: string;
  title: string;
  content: string;
}

export default async function Page() {
  const response = await fetch(
    "https://backfatvo.salyam.uz/api_v1/pages/privacy-policy/"
  );
  const data: PrivacyTypes = await response.json();
  return (
    <main className="flex flex-col gap-5 w-[70%] mx-auto">
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </main>
  );
}
