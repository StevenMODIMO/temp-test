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

export default function Home() {
  return (
    <div>
      <Banner />
      <section className="my-3 mx-5 lg:my-5">
        <LatestArticles />
        <LatestAnswers />
        <main>
          <HotTopics />
          <PinnedHadith />
          <PinnedQuestion />
          <PinnedBooks />
        </main>
        <MediaBlock />
        <main>
          <BookSales />
          <FreeBooks />
        </main>
      </section>
    </div>
  );
}
