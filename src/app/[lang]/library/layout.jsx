import TranslationsProvider from "../TranslationsProvider";
import initTranslations from "@/app/i18n";

export default async function Layout({ children, lang }) {
  const { resources } = await initTranslations(lang, ["library"]);
  return (
    <TranslationsProvider
      namespaces={["library"]}
      locale={lang}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}
