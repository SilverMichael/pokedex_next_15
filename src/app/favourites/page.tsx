'use client'

import React, { useEffect, useState } from "react"
import { PokemonCard } from "../components/PokemonCard"
import { getPokemonDetail } from "@/services/pokemon.service"
import Link from "next/link"

interface FavoritePokemon {
  name: string,
  id: number,
  sprite: string,
  types: string[]
}

export default function FavoritesPages() {
  const [favourites, setFavourites] = useState<Array<FavoritePokemon>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const updateFavorites = (removedName: string) => {
    setFavourites(prev => prev.filter(pokemon => pokemon.name !== removedName))
  }

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteNames = JSON.parse(localStorage.getItem("favourites") || '[]')
        const favoritesData = await Promise.all(
          favoriteNames.map(async (name: string) => {
            const details = await getPokemonDetail(name)
            return {
              name: details.name,
              id: details.id,
              sprite: details.sprites.other['official-artwork'].front_default,
              types: details.types.map((t: any) => t.type.name)
            }
          })
        )
        setFavourites(favoritesData)
      } catch (error) {
        console.error(`Error loading favourites: `, error)
      } finally {
        setIsLoading(false)
      }
    }
    loadFavorites()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 mt-20">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }
  return (
    <main className="container mx-auto pb-8 mt-20">
      <div className="mx-5 md:mx-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Favourites</h1>
        </div>

        {favourites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No favourites pokemon</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
              View pokedex
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favourites.map((pokemon) => (
              <PokemonCard
                key={`${pokemon.name}-${pokemon.id}`}
                name={pokemon.name}
                id={pokemon.id}
                sprite={pokemon.sprite}
                types={pokemon.types}
                onFavoriteUpdate={updateFavorites}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}