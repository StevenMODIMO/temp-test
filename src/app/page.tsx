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

export default function Home() {
  return (
    <div>
      <Banner />
      <section className="bg-gray-100 border-t-4 border-[#1f9065]">
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
  );
}
