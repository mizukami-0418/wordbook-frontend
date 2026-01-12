import WordList from "@/features/words/WordList";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/health/`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">単語帳アプリ</h1>
      <p className="mt-4 text-green-600">Backend Status: {data.status}</p>
      <WordList />
    </main>
  );
}
