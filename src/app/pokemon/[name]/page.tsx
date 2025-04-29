
import React from "react";
import { ProgressBar } from "@/app/components/ProgressBar";

interface PokemonDetail {
  name: string;
  id: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

async function getPokemonDetail(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();
  return data as PokemonDetail;
}

export default async function PokemonDetailPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemonDetail(params.name);

  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  const statColors: Record<string, string> = {
    hp: 'bg-red-500',
    attack: 'bg-orange-500',
    defense: 'bg-yellow-500',
    'special-attack': 'bg-blue-400',
    'special-defense': 'bg-green-400',
    speed: 'bg-pink-500',
  };

  return (
    <main className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-full h-auto max-w-xs mx-auto"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold capitalize mb-2">
                {pokemon.name} <span className="text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
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
                        {stat.stat.name.replace('-', ' ')}
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

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const data = await res.json();
  
  return data.results.map((pokemon: { name: string }) => ({
    name: pokemon.name,
  }));
}