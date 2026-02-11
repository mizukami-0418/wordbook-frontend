import { fetchWords } from "./api";

export default async function WordList() {
  const words = await fetchWords();

  return (
    <ul className="space-y-2">
      {words.map((word) => (
        <li key={word.id} className="border rounded p-3">
          <div className="font-semibold">{word.english}</div>
          <div className="text-sm text-gray-600">{word.japanese}</div>
          <div className="text-sm text-gray-600">{word.phrase}</div>
        </li>
      ))}
    </ul>
  );
}
