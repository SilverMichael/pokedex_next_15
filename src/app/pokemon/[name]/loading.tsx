
import Link from "next/link";

export default function PokemonDetailSkeleton() {
    return (
        <main className="container mx-auto py-5 px-4">
            <div className="max-w-4xl mx-auto  bg-red-500 dark:bg-red-700 rounded-2xl md:p-6 shadow-xl md:border-8 border-gray-900 dark:border-gray-700">

                <div className="bg-white dark:bg-gray-800 rounded-t-xl p-4 border-b-4 border-gray-200 dark:border-gray-600">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border-4 border-gray-200 dark:border-gray-600">
                        <div className="flex flex-col md:flex-row gap-6">

                            <div className="flex-1 flex flex-col items-center">
                                <div className="w-full max-w-xs bg-gray-300 dark:bg-gray-600 rounded-md p-2 border border-gray-400 aspect-square animate-pulse" />
                                <div className="mt-2 text-center">
                                    <span className="inline-block text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-semibold  animate-pulse">
                                        N° 000
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 text-gray-800">

                                <h1 className="text-2xl font-bold capitalize mb-2">
                                    <span className="inline-block bg-gray-300 rounded-md h-8 w-32 animate-pulse" />
                                </h1>

                                <div className="flex gap-2 mb-4 flex-wrap">
                                    <span className="inline-block bg-gray-300 rounded-md h-6 w-16 animate-pulse" />
                                    <span className="inline-block bg-gray-300 rounded-md h-6 w-16 animate-pulse" />
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-5">
                                    <div className="bg-gray-200 dark:bg-gray-600 p-3 rounded-md">
                                        <h3 className="text-xs text-gray-600 dark:text-gray-300">HEIGHT</h3>
                                        <p className="text-lg bg-gray-300 h-6 w-16 animate-pulse" />
                                    </div>
                                    <div className="bg-gray-200  dark:bg-gray-600 p-3 rounded-md">
                                        <h3 className="text-xs text-gray-600 dark:text-gray-300">WEIGHT</h3>
                                        <p className="text-lg bg-gray-300 h-6 w-16 animate-pulse" />
                                    </div>
                                </div>

                                <div className="bg-gray-200 dark:bg-gray-600 dark:text-gray-300 rounded-md p-4">
                                    <h2 className="text-lg font-bold mb-3">STATS</h2>
                                    <div className="space-y-2">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="inline-block bg-gray-300 rounded h-4 w-16 animate-pulse" />
                                                    <span className="inline-block bg-gray-300 rounded h-4 w-8 animate-pulse" />
                                                </div>
                                                <div className="w-full bg-gray-300 rounded-full h-2 animate-pulse" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-2 items-center">
                    <div className="w-14 h-18 bg-[#00a8e8] rounded-full border-4 border-gray-900 shadow-inner" />
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex  w-full mt-4 space-x-2">

                            <button
                                className={` w-full md:w-1/2 whitespace-nowrap  bg-gray-800 hover:bg-gray-700 text-white font-semibold  px-4 rounded-lg transition-all cursor-pointer`}

                            >
                                ← Previous
                            </button>


                            <button
                                className={` w-full md:w-1/2  whitespace-nowrap  bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all cursor-pointer`}

                            >
                                Next →
                            </button>

                        </div>
                        <Link
                            href="/"
                            className="text-white text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-md"
                        >
                            ← Go to home
                        </Link>
                    </div>
                    <div className="w-14 h-18 bg-[#ff4554] rounded-full border-4 border-gray-900 shadow-inner" />
                </div>
            </div>
        </main>
    );
}