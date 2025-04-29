import React from 'react';
import { PokemonCard } from './components/PokemonCard';
import { getPokemonList } from '@/services/pokemon.service';


export default async function Home() {
  const pokemonList = await getPokemonList()

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemonList?.results?.map((pokemon, index) => (
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