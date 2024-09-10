export default function QuestionDetail({ params }: { params: { id: string } }) {
  return (
    <main>
      <header>Now viewing question with id: {params.id}</header>
    </main>
  );
}
