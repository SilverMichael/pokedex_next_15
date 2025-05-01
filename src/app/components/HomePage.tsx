'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)

  // load all pokemons names
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

  // load poke filtered details
  useEffect(() => {
    const fetchFilteredPokemon = async () => {
      if (allPokemonNames.length === 0) return

      try {
        setIsLoading(true)


        const filteredNames = allPokemonNames
          .filter(name => name.toLowerCase().includes(search.toLowerCase()))


        const namesToLoad = selectedTypes.length > 0
          ? filteredNames
          : filteredNames.slice(0, 50)

        const details = await Promise.all(namesToLoad.map(name => getPokemonDetail(name)))


        const filteredByType = selectedTypes.length > 0
          ? details.filter(pokemon =>
            pokemon.types.some(({ type }) => selectedTypes.includes(type.name as PokemonType)))
          : details

        setPokemonList(filteredByType)
      } catch (err) {
        console.error('Error loading Pokémon:', err)
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchFilteredPokemon()
    }, 300)

    return () => clearTimeout(timer)
  }, [allPokemonNames, search, selectedTypes])

  const handleResetFilters = useCallback(() => {
    setSearch('')
    setSelectedTypes([])
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

        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

        {isLoading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : (
          <>
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

            {filteredPokemon.length === 0 && !isLoading && (
              <div className="text-center py-8 text-gray-500">
                Aucun Pokémon trouvé avec ces critères de recherche.
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}