"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

interface User {
  id: string;
  name: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  createdAt: string;
}

interface Thread {
  id: number;
  title: string;
  content?: string;
  imageUrl?: string;
  user: User; // pembuat thread
  comments: Comment[];
}

export default function ForumPage() {
  const { data: session } = useSession();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchThreads = async () => {
      const res = await fetch("/api/threads");
      const data = await res.json();
      setThreads(data);
    };
    fetchThreads();
    const interval = setInterval(fetchThreads, 2000);
    return () => clearInterval(interval);
  }, []);

  const deleteThread = async (id: number) => {
    if (!confirm("Yakin ingin menghapus thread ini?")) return;
    await fetch(`/api/threads?id=${id}`, { method: "DELETE" });
  };

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-500">Forum Diskusi</h1>
        {!session ? (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 text-gray-500 px-4 py-2 rounded"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-500 px-4 py-2 rounded"
            >
              Halo, {session.user?.name}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-500 border rounded shadow z-10">
                <Link href="/forum/create" className="block px-4 py-2 hover:bg-gray-100">
                  Buat Thread Baru
                </Link>
                <Link href="/forum/mine" className="block px-4 py-2 hover:bg-gray-100">
                  Thread Saya
                </Link>
                <div className="px-4 py-2">
                  <input
                    type="text"
                    placeholder="Cari thread..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded p-1"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Daftar thread */}
      <div className="grid gap-4">
        {filteredThreads.map((thread) => {
          const lastComment = thread.comments[thread.comments.length - 1];
          return (
            <div
              key={thread.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <Link href={`/forum/${thread.id}`}>
                <h2 className="text-xl font-semibold text-gray-800">{thread.title}</h2>
                {thread.content && (
                  <p className="text-gray-600 mt-1 line-clamp-3">{thread.content}</p>
                )}
                {thread.imageUrl && (
                  <img
                    src={thread.imageUrl}
                    alt="Thread image"
                    className="mt-2 max-h-48 w-full object-cover rounded"
                  />
                )}
              </Link>

              <div className="mt-2 text-gray-500 text-sm flex justify-between">
                <span>Dibuat oleh: {thread.user?.name}</span>
                {lastComment && (
                  <span>Komentar terakhir oleh: {lastComment.user?.name}</span>
                )}
              </div>

              {session && (
                <button
                  onClick={() => deleteThread(thread.id)}
                  className="mt-2 text-red-500 hover:underline"
                >
                  Hapus
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
