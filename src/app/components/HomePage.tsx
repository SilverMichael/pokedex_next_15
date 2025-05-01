'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { PokemonCard } from './PokemonCard'
import SearchFilters from './SearchFilters'
import { PokemonType, PokemonDetail } from '@/types/pokemon.types'
import { getPokemonDetail, getPokemonList } from '@/services/pokemon.service'



export default function HomePage() {
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([])
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)



  const loadAllPokemonNames = async () => {
    try {
      const response = await getPokemonList(1000, 0)
      setAllPokemonNames(response.results.map(p => p.name))
      setHasMore(response.results.length > 0)
    } catch (err) {
      console.error('Error loading Pokémon names:', err)
    }
  }
  const handleResetFilters = async () => {
    setSearch('')
    setSelectedTypes([])
    setPokemonList([])
    setOffset(0)
    setIsLoading(true)

    try {
      await loadAllPokemonNames()
      const initialBatch = await getPokemonList(50, 0)
      const details = await Promise.all(
        initialBatch.results.map(p => getPokemonDetail(p.name))
      )
      setPokemonList(details)
      setOffset(50)
    } catch (err) {
      console.error('Error resetting Pokémon:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAllPokemonNames()
  }, [])

  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        const response = await getPokemonList(10000, 0)
        setAllPokemonNames(response.results.map(p => p.name))
        setHasMore(response.results.length > 0)
      } catch (err) {
        console.error('Error loading Pokémon names:', err)
      }
    }
    fetchAllPokemonNames()
  }, [])


  const fetchPokemonBatch = async (limit: number, offset: number) => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const namesToLoad = search
        ? allPokemonNames
          .filter(name => name.toLowerCase().includes(search.toLowerCase()))
          .slice(offset, offset + limit)
        : allPokemonNames.slice(offset, offset + limit)

      if (selectedTypes.length > 0) {
        const details = await Promise.all(namesToLoad.map(name => getPokemonDetail(name)))
        const filtered = details.filter(pokemon =>
          pokemon.types.some(({ type }) => selectedTypes.includes(type.name as PokemonType))
        )
        setPokemonList(prev => [...prev, ...filtered])
        setHasMore(filtered.length === limit)
      } else {
        const details = await Promise.all(namesToLoad.map(name => getPokemonDetail(name)))
        setPokemonList(prev => [...prev, ...details])
        setHasMore(namesToLoad.length === limit)
      }

      setOffset(offset + namesToLoad.length)
    } catch (err) {
      console.error('Error loading Pokémon:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (allPokemonNames.length > 0) {
      fetchPokemonBatch(50, 0)
    }
  }, [allPokemonNames])

  useEffect(() => {
    setPokemonList([])
    setOffset(0)
    fetchPokemonBatch(50, 0)
  }, [search, selectedTypes])

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


      <div className="mt-20 pt-4">

        <SearchFilters
          search={search}
          onSearchChange={setSearch}
          selectedTypes={selectedTypes}
          onTypesChange={setSelectedTypes}
          showSearch={showSearch}
          toggleSearch={() => setShowSearch(prev => !prev)}
          onResetFilters={handleResetFilters}
        />
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPokemon.map(pokemon => (

            <PokemonCard
              key={`${pokemon.name}-${pokemon.id}`}
              name={pokemon.name}
              id={pokemon.id}
              sprite={pokemon.sprites.other['official-artwork'].front_default}
              types={pokemon.types.map(t => t.type.name)}
            />
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => fetchPokemonBatch(20, offset)}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:bg-blue-300"
            >
              {isLoading ? 'Chargement...' : 'Afficher plus'}
            </button>
          </div>
        )}


      </div>






    </main>
  )
}