interface PageProps {
  params: { slug: string };
}

interface Thread {
  id: number;
  title: string;
  content?: string;
  imageUrl?: string;
  comments: { id: number; content: string }[];
}

export default async function ForumThreadPage({ params }: PageProps) {
  const res = await fetch("https://arara.rf.gd/wp-json/forum/threads");
  const threads: Thread[] = await res.json();
  const thread = threads.find((t) => t.id === Number(params.slug));

  if (!thread) {
    return <h1 className="text-center mt-20 text-2xl">Thread tidak ditemukan</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>
      {thread.content && <p className="mb-4">{thread.content}</p>}
      {thread.imageUrl && (
        <img src={thread.imageUrl} alt={thread.title} className="mb-4 max-w-full rounded" />
      )}

      <h2 className="font-semibold mb-2">Komentar:</h2>
      <ul className="space-y-2">
        {thread.comments.length === 0 && <li>Belum ada komentar.</li>}
        {thread.comments.map((c) => (
          <li key={c.id} className="border p-2 rounded">
            {c.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
