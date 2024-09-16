import initTranslations from "@/app/i18n";

interface PrivacyTypes {
  slug: string;
  title: string;
  content: string;
}

export default async function Page({ params }: { params: { lang: string } }) {
  const { t, i18n } = await initTranslations(params.lang, ["home"]);
  const response = await fetch(
    "https://backfatvo.salyam.uz/api_v1/pages/privacy-policy/",
    {
      headers: {
        "Accept-Language":
          i18n.language === "uz-Cyrl" ? "uz-cyr" : i18n.language,
      },
    }
  );
  const data: PrivacyTypes = await response.json();
  return (
    <main className="flex flex-col gap-5 w-[80%] my-16 mx-auto">
      <h1 className="text-3xl font-semibold">{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </main>
  );
}
