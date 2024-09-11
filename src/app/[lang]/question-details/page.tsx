import Questions from "@/components/Questions";

export default function Page() {
  return (
    <main className="bg-gray-200">
      <section className="mx-4 p-2 sm:mx-8 md:mx-10 md:px-2 md:pt-10">
        <header className="border-b-4 border-[#1f9065] text-[#1f9065] text-3xl font-semibold md:text-4xl">
          <h1>Questions</h1>
        </header>
        <Questions />
      </section>
    </main>
  );
}
