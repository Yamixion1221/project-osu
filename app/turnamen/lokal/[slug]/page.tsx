"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

interface PostDetailType {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string }[];
  };
}

export default function PostDetail({ params }: Props) {
  const { slug } = use(params); // ambil slug dari URL
  const [post, setPost] = useState<PostDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://arara.rf.gd/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then((res) => res.json())
      .then((data) => setPost(data[0] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!post) return <p className="text-center py-8">Post tidak ditemukan.</p>;

  return (
    <main className="container mx-auto px-6 py-8">
      {/* Featured image */}
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <div className="relative w-full h-72 mb-6">
          <Image
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post.title.rendered}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* Title */}
      <h1
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        className="text-3xl font-bold mb-4"
      />

      {/* Metadata */}
      <div className="flex justify-between text-gray-400 text-sm mb-6">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>{post._embedded?.author?.[0]?.name || "Unknown"}</span>
      </div>

      {/* Content */}
      <div
        className="prose max-w-full text-gray-200"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </main>
  );
}
