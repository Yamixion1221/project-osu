import React from "react";

// Ambil halaman WordPress berdasarkan slug
async function getPage(slug: string) {
  const res = await fetch(
    `https://arara.rf.gd/wp-json/wp/v2/pages?slug=${slug}`,
    {
      next: { revalidate: 60 }, // ISR: regenerate setiap 60 detik
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data[0] || null;
}

// Generate path statis (biar pre-render waktu build)
export async function generateStaticParams() {
  const res = await fetch(`https://arara.rf.gd/wp-json/wp/v2/pages`);
  const pages = await res.json();

  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
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
