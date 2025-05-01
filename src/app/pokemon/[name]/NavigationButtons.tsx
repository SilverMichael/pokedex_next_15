"use client";

import { useRouter } from "next/navigation";

export default function NavigationButtons({
  previousName,
  nextName,
}: {
  previousName: string | null;
  nextName: string | null;
}) {
  const router = useRouter();

  return (
    <div className="flex  w-full mt-4 space-x-2">
      {previousName && (
        <button
          className={`${nextName ? "w-full md:w-1/2" : "w-full"}  whitespace-nowrap  bg-gray-800 hover:bg-gray-700 text-white font-semibold  px-4 rounded-lg transition-all cursor-pointer`}
          onClick={() => router.push(`/pokemon/${previousName}`)}
        >
          ← Previous
        </button>
      )}
      {nextName && (
        <button
          className={` ${previousName ? 'w-full md:w-1/2' : 'w-full '}  whitespace-nowrap  bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all cursor-pointer`}
          onClick={() => router.push(`/pokemon/${nextName}`)}
        >
          Next →
        </button>
      )}
    </div>
  );
}
