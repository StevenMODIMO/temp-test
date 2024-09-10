export default function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Now viewing categorry with id: {params.id}</h1>
    </main>
  );
}
