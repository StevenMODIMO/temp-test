import SingleQuestion from "@/components/SingleQuestion";

export default function QuestionDetail({ params }: { params: { id: string } }) {
  return (
    <main>
      <SingleQuestion id={params.id} />
    </main>
  );
}
