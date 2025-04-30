import React from 'react';
import { getPokemonList, getPokemonDetail } from '@/services/pokemon.service';
import HomePage from './components/HomePage';


export default async function Home() {
  const pokemonList = await getPokemonList()
  const pokemonDetails = await Promise.all(
    pokemonList.results.map(pokemon => getPokemonDetail(pokemon.name))
  )

  return (
    <main className="container mx-auto py-8">
      <HomePage pokemonDetails={pokemonDetails} />
    </main>
  );
}