import React from "react";

interface WPPage {
  slug: string;
}

interface WPPageDetail {
  title: { rendered: string };
  content: { rendered: string };
}

async function getPage(slug: string): Promise<WPPageDetail | null> {
  const res = await fetch(
    `https://arara.rf.gd/wp-json/wp/v2/pages?slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const data: WPPageDetail[] = await res.json();
  return data[0] || null;
}

// Generate static paths
export async function generateStaticParams() {
  const res = await fetch(`https://arara.rf.gd/wp-json/wp/v2/pages`);
  if (!res.ok) return [];
  const pages: WPPage[] = await res.json();

  return pages.map((page) => ({ slug: page.slug }));
}

// Tipe props Next.js untuk page async
type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const page = await getPage(params.slug);

  if (!page) {
    return <h1 className="text-center mt-20 text-2xl">Halaman tidak ditemukan</h1>;
  }

  return (
    <main className="prose mx-auto p-6">
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </main>
  );
}
