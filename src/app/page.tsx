import Banner from "@/components/Banner";
import RegionSelection from "@/components/RegionSelection";
import HotTopics from "@/components/HotTopics";
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
      <RegionSelection />
      <main className="bg-gray-200 lg:grid grid-cols-2 lg:gap-6">
        <section>
          {/* <LatestArticles /> */}
          <LatestAnswers />
        </section>
        <section>
          <HotTopics />
          <PinnedHadith />
          <PinnedQuestion />
          <PinnedBooks />
        </section>
      </main>
      <MediaBlock />
      <section>
        <BookSales />
        <FreeBooks />
      </section>
    </div>
  );
}
