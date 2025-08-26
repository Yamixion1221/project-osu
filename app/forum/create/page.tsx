"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function CreateThreadPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <p className="mb-4 text-gray-700">
          Anda perlu login terlebih dahulu untuk membuat thread.
        </p>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Judul thread wajib diisi");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      if (!res.ok) throw new Error("Gagal membuat thread");

      setTitle("");
      setContent("");
      setImageUrl("");
      router.push("/forum"); // kembali ke daftar thread
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat thread");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Buat Thread Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-500 p-6 rounded shadow">
        <div>
          <label className="block text-gray-900 mb-1">Judul Thread</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan judul thread"
            required
          />
        </div>
        <div>
          <label className="block text-gray-900 mb-1">Konten</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[150px]"
            placeholder="Tulis konten thread di sini..."
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">URL Gambar (opsional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan URL gambar"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Membuat..." : "Buat Thread"}
        </button>
      </form>

      {/* Preview sederhana */}
      {(title || content || imageUrl) && (
        <div className="mt-8 p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          {title && <h3 className="font-bold text-gray-800">{title}</h3>}
          {content && <p className="mt-1 text-gray-700">{content}</p>}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-2 max-h-64 w-full object-cover rounded"
            />
          )}
        </div>
      )}
    </div>
  );
}
