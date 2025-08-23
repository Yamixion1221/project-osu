"use client"; // HARUS di baris paling atas

import { useEffect, useState } from "react";
import { use } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function PostDetail({ params }: Props) {
  const { slug } = use(params); // unwrap params
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`https://arara.rf.gd/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then(res => res.json())
      .then(data => setPost(data[0]));
  }, [slug]);

  if (!post) return <p className="text-center py-8">Loading...</p>;

  return (
    <main className="container mx-auto px-6 py-8">
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} className="text-3xl font-bold mb-4" />
      <div className="flex justify-between text-gray-400 text-sm mb-6">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>{post._embedded?.author?.[0]?.name}</span>
      </div>
      <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </main>
  );
}
