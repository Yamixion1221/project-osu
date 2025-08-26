"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  date: string;
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string }[];
  };
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://arara.rf.gd/wp-json/wp/v2/posts?_embed")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <main className="container mx-auto px-6 py-8 relative z-0">
      <h2 className="bg-black text-2xl font-bold text-center py-2 mb-6">Berita</h2>

      <div className="post-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-0">
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/berita/${post.slug}`}
            className="post-card block relative z-0 cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
          >
            {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <div className="w-full h-48 relative">
                <Image
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post.title.rendered}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg"
                  unoptimized
                />
              </div>
            )}

            <div className="p-4 bg-black">
              <h3
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                className="font-bold text-lg mb-2"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>{post._embedded?.author?.[0]?.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/berita"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Lihat Berita Lainnya
        </Link>
      </div>
    </main>
  );
}
