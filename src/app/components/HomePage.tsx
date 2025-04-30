'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { PokemonCard } from './PokemonCard'
import SearchFilters from './SearchFilters'

import { PokemonType, PokemonDetail } from '@/types/pokemon.types'
import { getPokemonDetail, getPokemonList } from '@/services/pokemon.service'

export default function HomePage({ pokemonDetails }: { pokemonDetails: PokemonDetail[] }) {
    const [search, setSearch] = useState('')
    const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([])
    const [showSearch, setShowSearch] = useState(false)
  
    const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([])
    const [offset, setOffset] = useState(0)
    const limitInitial = 50
    const limitMore = 20
  
    const fetchPokemonBatch = async (limit: number, offset: number) => {
      try {
        const list = await getPokemonList(limit, offset)
        const details = await Promise.all(list.results.map(p => getPokemonDetail(p.name)))
        setPokemonList(prev => [...prev, ...details])
        setOffset(offset + limit)
      } catch (err) {
        console.error('Error loading Pokémon:', err)
      }
    }
  
    useEffect(() => {
      fetchPokemonBatch(limitInitial, 0)
    }, [])
  
    const filteredPokemon = useMemo(() => {
      return pokemonList.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase())
        const matchesTypes =
          selectedTypes.length === 0 ||
          pokemon.types.some(({ type }) => selectedTypes.includes(type.name as PokemonType))
        return matchesSearch && matchesTypes
      })
    }, [pokemonList, search, selectedTypes])
  
    return (
      <main className="container mx-auto py-8">
        <SearchFilters
          search={search}
          onSearchChange={setSearch}
          selectedTypes={selectedTypes}
          onTypesChange={setSelectedTypes}
          showSearch={showSearch}
          toggleSearch={() => setShowSearch(prev => !prev)}
        />
  
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPokemon.map(pokemon => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              id={pokemon.id}
              sprite={pokemon.sprites.other['official-artwork'].front_default}
              types={pokemon.types.map(t => t.type.name)}
            />
          ))}
        </div>
  
        <div className="flex justify-center mt-10">
          <button
            onClick={() => fetchPokemonBatch(limitMore, offset)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Load more Pokémon
          </button>
        </div>
      </main>
    )
}
