"use client";
import { useSession, signOut } from "next-auth/react"; // <-- tambahkan signOut
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="p-6 items-center">
        <p>Anda belum login.</p>
        <Link href="/"><button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Kembali ke Home</button></Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-900 rounded shadow-md text-white">
      <div className="flex flex-col items-center gap-4">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "Avatar"}
            width={120}
            height={120}
            className="rounded-full"
          />
        )}
        <h2 className="text-2xl font-bold">{session.user?.name}</h2>
        {session.user?.email && <p>Email: {session.user.email}</p>}
        <p>Provider: {session.user?.email?.includes("@gmail.com") ? "Google" : "osu!"}</p>

        <button
          className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
