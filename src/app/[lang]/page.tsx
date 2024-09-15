import Banner from "@/components/Banner";
import PrayerTimes from "@/components/PrayerTimes";
import HotTopics from "@/components/HotTopics";
import LatestArticles from "@/components/LatestArticles";
import LatestAnswers from "@/components/LatestAnswers";
import PinnedHadith from "@/components/PinnedHadith";
import PinnedQuestion from "@/components/PinnedQuestion";
import PinnedBooks from "@/components/PinnedBooks";
import MediaBlock from "@/components/MediaBlock";
import BookSales from "@/components/BookSales";
import FreeBooks from "@/components/FreeBooks";
import NotFound from "@/components/NotFound";
import TranslationsProvider from "./TranslationsProvider";
import initTranslations from "../i18n";

interface IHomePageProps {
  params: { lang: string };
}

export default async function Home({ params: { lang } }: IHomePageProps) {
  const { t, resources } = await initTranslations(lang, ["home"]);

  return (
    <TranslationsProvider
      namespaces={["home"]}
      locale={lang}
      resources={resources}
    >
      <div className="bg-gray-100">
        <Banner />
        <PrayerTimes />
        <div className="bg-[#1f9065] w-full h-1"></div>
        <section className="lg:w-[80%] lg:mx-auto">
          <main className="my-3 mx-5 lg:my-5 lg:mx-12 lg:flex lg:gap-14">
            <div className="lg:w-[60%]">
              <LatestArticles />
              <LatestAnswers />
            </div>
            <div className="lg:w-[30%]">
              <HotTopics />
              <PinnedHadith />
              <PinnedQuestion />
              <PinnedBooks />
            </div>
          </main>
          <MediaBlock />
          <main className="my-3 mx-5 lg:my-5 lg:mx-12 lg:flex items-center gap-16">
            <BookSales />
            <FreeBooks />
          </main>
        </section>
      </div>
    </TranslationsProvider>
  );
}
