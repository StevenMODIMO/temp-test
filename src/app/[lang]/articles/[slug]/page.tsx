interface ArticleTypes {
  title: string;
  slug: string;
  author: string;
  image: string;
  context: string;
}

import Image from "next/image";
import initTranslations from "@/app/i18n";

export default async function Article({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const { t, i18n } = await initTranslations(params.lang, ["library"]);
  const response = await fetch(
    `https://backfatvo.salyam.uz/api_v1/articles/${params.slug}/`,
    {
      headers: {
        "Accept-Language":
          i18n.language === "uz-Cyrl" ? "uz-cyr" : i18n.language,
      },
    }
  );
  const data = await response.json();
  return (
    <main className="w-[70%] mx-auto my-24 p-4">
      <header className="flex gap-2 items-center">
        <p className="text-2xl font-semibold">{data.title}</p>
        <p className="text-gray-500 text-lg mt-1">{data.view} {t("views")}</p>
      </header>
      <p className="text-[#1f9065] text-lg p-3 font-semibold">
         {data.author}
      </p>
      <div className="relative w-[50%] h-[50%]">
        {data.image ? (
          <Image src={data.image} alt={data.title} fill />
        ) : (
          <div></div>
        )}
      </div>
      <div
        className="text-lg p-3"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </main>
  );
}
