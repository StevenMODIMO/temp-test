interface ArticleTypes {
  title: string;
  slug: string;
  author: string;
  image: string;
  context: string;
}

import Image from "next/image";

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const response = await fetch(
    `https://backfatvo.salyam.uz/api_v1/articles/${params.slug}/`
  );
  const data = await response.json();
  return (
    <main className="w-[70%] mx-auto p-4">
      <header className="flex gap-2 items-center">
        <p className="text-3xl font-semibold ">{data.title}</p>
        <p className="text-gray-500 text-sm mt-3">views: {data.view}</p>
      </header>
      <p className="text-[#1f9065] text-lg p-3 font-semibold">
        Author: {data.author}
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
