"use client";

import { useRouter } from "next/navigation";

export default function NavigationButtons({ previousName, nextName }: { previousName: string | null; nextName: string | null }) {
  const router = useRouter();

  return (
    <div className="flex w-full mt-4 space-x-0.5">
      {previousName && (
        <button
          className="w-1/2 bg-neutral-300 hover:bg-blue-300 text-gray-800 font-bold p-3 rounded-l-lg transition-all cursor-pointer"
          onClick={() => router.push(`/pokemon/${previousName}`)}
        >
          ← Previous
        </button>
      )}
      {nextName && (
        <button
          className="w-1/2 bg-neutral-300 hover:bg-blue-300 text-gray-800 font-bold p-3 rounded-r-lg  transition-all cursor-pointer"
          onClick={() => router.push(`/pokemon/${nextName}`)}
        >
          Next →
        </button>
      )}
    </div>
  );
}
