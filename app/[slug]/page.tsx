import React from "react";

// Tipe halaman WordPress
interface WPPage {
  slug: string;
}

interface WPPageDetail {
  title: { rendered: string };
  content: { rendered: string };
}

// Ambil halaman WordPress berdasarkan slug
async function getPage(slug: string): Promise<WPPageDetail | null> {
  const res = await fetch(
    `https://arara.rf.gd/wp-json/wp/v2/pages?slug=${slug}`,
    { next: { revalidate: 60 } } // ISR: regenerate setiap 60 detik
  );

  if (!res.ok) return null;

  const data: WPPageDetail[] = await res.json();
  return data[0] || null;
}

// Generate path statis untuk pre-render waktu build
export async function generateStaticParams() {
  const res = await fetch(`https://arara.rf.gd/wp-json/wp/v2/pages`);
  if (!res.ok) return [];

  const pages: WPPage[] = await res.json();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Halaman utama
export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const page = await getPage(params.slug);

  if (!page) {
    return (
      <h1 className="text-center mt-20 text-2xl">
        Halaman tidak ditemukan
      </h1>
    );
  }

  return (
    <main className="prose mx-auto p-6">
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </main>
  );
}
