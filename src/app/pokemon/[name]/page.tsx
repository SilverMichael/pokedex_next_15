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


export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
  const { name } = params;
  const pokemon = await getPokemonDetail(name);

  const previousName = pokemon.id > 1 ? await getPokemonNameById(pokemon.id - 1) : null;
  const nextName = pokemon.id < 898 ? await getPokemonNameById(pokemon.id + 1) : null;


  return (
    <main className="container mx-auto py-8">
      <NavigationButtons
        previousName={previousName}
        nextName={nextName}
      />
      <div className="mb-4">
        <Link
          href="/"
          className="inline-block mt-10 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          ← Retour à l’accueil
        </Link>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                quality={80}
                width={768}
                height={768}
                className="w-full h-auto max-w-xs mx-auto"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold capitalize mb-2">
                {pokemon.name}
                <span className="text-gray-500 ml-2">#{pokemon.id.toString().padStart(3, '0')}</span>
              </h1>

              <div className="flex gap-2 mb-4">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full text-white ${typeColors[type.type.name] || 'bg-gray-400'}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-gray-500">Height</h3>
                  <p>{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div>
                  <h3 className="text-gray-500">Weight</h3>
                  <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>

              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">
                        {stat.stat.name.replace("-", " ")}
                      </span>
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
    </main>
  );
}
