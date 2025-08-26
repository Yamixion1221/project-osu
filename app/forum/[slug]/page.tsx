"use client";

import { useEffect, useState } from "react";

interface Props {
  params: { slug: string }; // slug dari URL
}

interface Comment {
  id: number;
  content: string;
}

interface Thread {
  id: number;
  title: string;
  content?: string;
  imageUrl?: string;
  comments?: Comment[];
}

export default function ForumThreadPage({ params }: Props) {
  const threadId = Number(params.slug);
  const [thread, setThread] = useState<Thread | null>(null);

  useEffect(() => {
    let isMounted = true; // untuk menghindari state update setelah unmount

    const fetchData = async () => {
      try {
        const res = await fetch("/api/threads");
        if (!res.ok) throw new Error("Failed to fetch threads");
        const threads: Thread[] = await res.json();
        const t = threads.find(th => th.id === threadId);
        if (t && isMounted) setThread(t);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [threadId]);

  if (!thread) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{thread.title}</h1>
      {thread.content && <p className="mt-2">{thread.content}</p>}
      {thread.imageUrl && (
        <img
          src={thread.imageUrl}
          alt="Gambar Thread"
          className="mt-2 max-w-full rounded"
        />
      )}

      <h2 className="font-semibold mt-6 mb-2">Komentar:</h2>
      <ul className="space-y-2">
        {thread.comments?.length === 0 && <li>Belum ada komentar.</li>}
        {thread.comments?.map(c => (
          <li key={c.id} className="border p-2 rounded">
            {c.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
