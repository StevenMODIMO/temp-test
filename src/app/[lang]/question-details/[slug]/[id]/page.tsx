import SingleQuestion from "@/components/SingleQuestion";

export default function QuestionDetail({ params }: { params: { id: string } }) {
  return (
    <main className="bg-gray-200 py-6">
      <SingleQuestion id={params.id} />
    </main>
  );
}
