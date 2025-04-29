import React from 'react';
import { PokemonCard } from './components/PokemonCard';


interface PokemonList {
  name: string;
  url: string;
}

async function getPokemonList(limit = 50) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await res.json();
  return data.results as PokemonList[];
}

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            id={index + 1}
          />
        ))}
      </div>
    </main>
  );
}