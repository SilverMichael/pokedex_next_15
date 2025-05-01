'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { PokemonCard } from './PokemonCard'
import SearchFilters from './SearchFilters'
import { PokemonType, PokemonDetail } from '@/types/pokemon.types'
import { getPokemonDetail, getPokemonList } from '@/services/pokemon.service'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [allPokemonNames, setAllPokemonNames] = useState<string[]>([])
  const [displayedPokemon, setDisplayedPokemon] = useState<PokemonDetail[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  // Load all pokemons names
  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        setIsLoading(true)
        const response = await getPokemonList(10000, 0)
        setAllPokemonNames(response.results.map(p => p.name))
      } catch (err) {
        console.error('Error loading Pokémon names:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllPokemonNames()
  }, [])

  // Reset display when filters change
  useEffect(() => {
    setDisplayedPokemon([])
    setOffset(0)
  }, [search, selectedTypes])

  // Load pokemons (initial or more)
  const loadPokemons = useCallback(async (loadMore = false) => {
    if (allPokemonNames.length === 0) return

    try {
      setIsLoading(true)
      const currentOffset = loadMore ? offset : 0

      // Filter by name first
      let namesToLoad = allPokemonNames
      if (search) {
        namesToLoad = allPokemonNames.filter(name => 
          name.toLowerCase().includes(search.toLowerCase())
        )
      }

      // Determine how many to load
      const loadCount = loadMore ? 20 : 50
      const namesBatch = namesToLoad.slice(currentOffset, currentOffset + loadCount)

      // Load details
      const details = await Promise.all(namesBatch.map(name => getPokemonDetail(name)))

      // Filter by type if needed
      const filteredDetails = selectedTypes.length > 0
        ? details.filter(pokemon =>
            pokemon.types.some(({ type }) => selectedTypes.includes(type.name as PokemonType)))
        : details

      // Update state
      setDisplayedPokemon(prev => 
        loadMore ? [...prev, ...filteredDetails] : filteredDetails
      )
      setOffset(currentOffset + namesBatch.length)
      setHasMore(currentOffset + namesBatch.length < namesToLoad.length)
    } catch (err) {
      console.error('Error loading Pokémon:', err)
    } finally {
      setIsLoading(false)
    }
  }, [allPokemonNames, search, selectedTypes, offset])

  // Initial load or filter change
  useEffect(() => {
    if (offset === 0 && displayedPokemon.length === 0) {
      loadPokemons()
    }
  }, [loadPokemons, offset, displayedPokemon.length])

  const handleResetFilters = useCallback(() => {
    setSearch('')
    setSelectedTypes([])
  }, [])

  return (
    <main className="container mx-auto py-8">
      <div className="mx-5 md:mx-0 pt-4">
        <SearchFilters
          search={search}
          onSearchChange={setSearch}
          selectedTypes={selectedTypes}
          onTypesChange={setSelectedTypes}
          showSearch={showSearch}
          toggleSearch={() => setShowSearch(prev => !prev)}
          onResetFilters={handleResetFilters}
        />

        <p className="text-4xl font-bold text-center mb-8">Pokedex</p>

        {isLoading && displayedPokemon.length === 0 ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {displayedPokemon.map(pokemon => (
                <PokemonCard
                  key={`${pokemon.name}-${pokemon.id}`}
                  name={pokemon.name}
                  id={pokemon.id}
                  sprite={pokemon.sprites.other['official-artwork'].front_default}
                  types={pokemon.types.map(t => t.type.name)}
                />
              ))}
            </div>

            {displayedPokemon.length === 0 && !isLoading && (
              <div className="text-center py-8 text-gray-500">
                No Pokémon found with these search criteria.
              </div>
            )}

            {hasMore && (
              <div className="flex justify-center mt-10"> 
                <button
                  onClick={() => loadPokemons(true)}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer disabled:bg-blue-300"
                >
                  {isLoading ? 'Loading...' : 'Show more'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}