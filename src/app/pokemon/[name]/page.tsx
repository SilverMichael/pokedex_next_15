import { getPokemonDetail } from "@/services/pokemon.service";
import NavigationButtons from "./NavigationButtons";
import Image from "next/image";
import { typeColors } from "@/types/pokemon.types";
import { ProgressBar } from "@/app/components/ProgressBar";
import { getPokemonNameById } from "@/app/utils/pokemon.utils";
import Link from "next/link";

const statColors: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-indigo-500",
  speed: "bg-green-500",
};


export default async function PokemonDetailPage({
  params
}: {
  params: { name: string }
}) {
  const { name } = params;

  const pokemon = await getPokemonDetail(name);

  const previousName = pokemon.id > 1 ? await getPokemonNameById(pokemon.id - 1) : null;
  const nextName = pokemon.id < 898 ? await getPokemonNameById(pokemon.id + 1) : null;


  return (
    <main className="container mx-auto md:py-5 md:px4">
      <div className="max-w-4xl mx-auto  bg-red-500 rounded-2xl md:p-6 shadow-xl md:border-8 border-gray-900">
        <div className="bg-white rounded-t-xl p-4 border-b-4 border-gray-200">
          <div className="bg-gray-100 rounded-lg p-4 border-4 border-gray-200">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full max-w-xs bg-gray-200 rounded-md p-2 border border-gray-300">
                  <Image
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    width={400}
                    height={400}
                    className="w-full h-auto"
                    quality={100}
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-gray-800 text-sm font-semibold bg-gray-300 px-3 py-1 rounded-full">
                    N° {pokemon.id.toString().padStart(3, '0')}
                  </span>
                </div>
              </div>


              <div className="flex-1 text-gray-800">
                <h1 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h1>

                {/* Types */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`px-3 py-1 text-white capitalize rounded-md text-sm font-semibold ${typeColors[type.type.name] || 'bg-gray-400'}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>

                {/* Weight and height */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-200 p-3 rounded-md">
                    <h3 className="text-xs text-gray-600">HEIGHT</h3>
                    <p className="text-lg">{(pokemon.height / 10).toFixed(1)} m</p>
                  </div>
                  <div className="bg-gray-200 p-3 rounded-md">
                    <h3 className="text-xs text-gray-600">WEIGHT</h3>
                    <p className="text-lg">{(pokemon.weight / 10).toFixed(1)} kg</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-gray-200 rounded-md p-4">
                  <h2 className="text-lg font-bold mb-3">STATS</h2>
                  <div className="space-y-2">
                    {pokemon.stats.map((stat) => (
                      <div key={stat.stat.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="capitalize">{stat.stat.name.replace("-", " ")}</span>
                          <span>{stat.base_stat}</span>
                        </div>
                        <ProgressBar
                          value={stat.base_stat}
                          max={255}
                          color={statColors[stat.stat.name] || 'bg-gray-400'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-2 items-center">
          <div className="w-14 h-18 bg-[#00a8e8] rounded-full border-4 border-gray-900 shadow-inner" />
          <div className="flex flex-col items-center gap-2">
            <NavigationButtons previousName={previousName} nextName={nextName} />
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
