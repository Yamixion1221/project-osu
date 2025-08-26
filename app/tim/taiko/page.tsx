"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string }[];
  };
}

export default function TimTaikoPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch(
        "https://arara.rf.gd/wp-json/wp/v2/posts?categories=8&_embed"
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (err) {
      // TypeScript sekarang menganggap 'err' bertipe 'unknown'
      if (err instanceof Error) {
        console.error("Fetch error:", err.message);
        setError("Gagal memuat postingan.");
      } else {
        console.error("Fetch error:", err);
        setError("Gagal memuat postingan.");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (posts.length === 0) return <p className="p-6">Belum ada postingan.</p>;

  const [firstPost, ...otherPosts] = posts;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tim osu! Taiko</h1>

      {/* Postingan pertama (besar) */}
      <Link
        href={`/tim/taiko/${firstPost.slug}`}
        className="block bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
      >
        {firstPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <Image
            src={firstPost._embedded["wp:featuredmedia"][0].source_url}
            alt={firstPost.title.rendered}
            className="w-full h-60 object-cover"
          />
        )}
        <div className="p-4">
          <h2
            className="text-xl font-bold text-blue-400 mb-2"
            dangerouslySetInnerHTML={{ __html: firstPost.title.rendered }}
          />
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>{new Date(firstPost.date).toLocaleDateString()}</span>
            <span>{firstPost._embedded?.author?.[0]?.name || "Author"}</span>
          </div>
          <div
            className="text-gray-200"
            dangerouslySetInnerHTML={{ __html: firstPost.excerpt.rendered }}
          />
        </div>
      </Link>

      {/* Postingan lainnya */}
      <ul className="space-y-4 mt-6">
        {otherPosts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/tim/taiko/${post.slug}`}
              className="flex bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <Image
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post.title.rendered}
                  className="w-32 h-32 object-cover flex-shrink-0"
                />
              )}
              <div className="p-4 flex flex-col justify-between">
                <h3
                  className="text-lg font-bold text-blue-400 mb-1"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <span className="text-sm text-gray-300">
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-300">
                  {post._embedded?.author?.[0]?.name || "Author"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
