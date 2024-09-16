import TranslationsProvider from "../TranslationsProvider";
import initTranslations from "@/app/i18n";

export default async function Layout({ children, lang }) {
  const { resources } = await initTranslations(lang, ["categories"]);
  return (
    <TranslationsProvider
      namespaces={["categories"]}
      locale={lang}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}
