"use client";

import { useEffect, useState } from "react";
import { use } from "react";
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
  const { slug } = use(params);
  const [post, setPost] = useState<PostDetailType | null>(null);

  useEffect(() => {
    fetch(`https://arara.rf.gd/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then((res) => res.json())
      .then((data) => setPost(data[0]));
  }, [slug]);

  if (!post) return <p className="text-center py-8">Loading...</p>;

  return (
    <main className="container mx-auto px-6 py-8">
      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
        <Image
          src={post._embedded["wp:featuredmedia"][0].source_url}
          alt={post.title.rendered}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      <h1
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        className="text-3xl font-bold mb-4"
      />
      <div className="flex justify-between text-gray-400 text-sm mb-6">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>{post._embedded?.author?.[0]?.name}</span>
      </div>

      <div
        className="prose max-w-full text-gray-200"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      ></div>
    </main>
  );
}
