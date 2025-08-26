"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Comment { id: number; content: string; }
interface Thread { id: number; title: string; }

export default function ThreadPage() {
  const { slug } = useParams();
  const threadId = Number(slug);
  const [thread, setThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Polling otomatis tiap 2 detik
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/threads");
      const threads: (Thread & { comments: Comment[] })[] = await res.json();
      const t = threads.find((th) => th.id === threadId);
      if (t) {
        setThread({ id: t.id, title: t.title });
        setComments(t.comments);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [threadId]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId, content: newComment }),
    });
    setNewComment("");
  };

  if (!thread) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="mb-4">
  <h1 className="text-2xl font-bold">{thread.title}</h1>
  {thread.content && <p className="mt-2">{thread.content}</p>}
  {thread.imageUrl && (
    <img src={thread.imageUrl} alt="Gambar Thread" className="mt-2 max-w-full rounded" />
  )}
</div>


      <div className="mb-6">
        <input
          type="text"
          placeholder="Tulis komentar..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addComment} className="bg-green-500 text-white px-4 py-2 rounded">
          Kirim
        </button>
      </div>

      <h2 className="font-semibold mb-2">Komentar:</h2>
      <ul className="space-y-2">
        {comments.length === 0 && <li>Belum ada komentar.</li>}
        {comments.map((c) => (
          <li key={c.id} className="border p-2 rounded">{c.content}</li>
        ))}
      </ul>
    </div>
  );
}
