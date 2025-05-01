import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { typeColors } from '@/types/pokemon.types'
import { motion } from 'framer-motion';


interface PokemonCardProps {
  name: string
  id: number
  sprite: string
  types: string[]
}

const getDirection = (id: number) => {
  const directions = ['right', 'left', 'top', 'bottom'] as const
  return directions[id % 4]
}


export const PokemonCard = ({ name, id, sprite, types }: PokemonCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const direction = getDirection(id)

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'right' ? 100 : direction === 'left' ? -100 : 0,
      y: direction === 'top' ? -100 : direction === 'bottom' ? 100 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  }

  // Charger l'état favori au montage du composant
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favourites") || '[]')
    setIsFavorite(favorites.includes(name))
  }, [name])

  // Gérer le clic sur l'étoile
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault() // Empêche la navigation via le lien
    e.stopPropagation() // Empêche la propagation de l'événement

    const favorites = JSON.parse(localStorage.getItem('favourites') || '[]')
    let newFavorites

    if (isFavorite) {
      newFavorites = favorites.filter((fav: string) => fav !== name)
    } else {
      newFavorites = [...favorites, name]
    }

    localStorage.setItem('favourites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >

      <Link href={`/pokemon/${name}`} className="group relative">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md transition-transform hover:scale-105">


          <div className="flex justify-center">
            <Image
              src={sprite}
              alt={name}
              width={128}
              height={128}
              quality={80}
              placeholder="blur"
              blurDataURL="data:image/png;base64,..."
              className="object-contain"
            />
          </div>
          <p className="text-gray-500">N°{id}</p>
          <div className='flex justify-between'>
            <div>
              <h2 className="mt-1 capitalize font-medium text-gray-950 group-hover:text-blue-600">
                {name}
              </h2>
              <div className="flex gap-2">
                {types.map((type) => (
                  <span
                    key={type}
                    className={`px-3 py-1 mt-1 text-xs rounded-md text-white ${typeColors[type] || 'bg-gray-400'
                      }`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            {/* Bouton étoile en haut à droite */}
            <button
              onClick={toggleFavorite}
              className="w-8 h-8 bg-white rounded-full shadow"
              aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                viewBox="0 -4 21 30"
                width={30}
                height={30}
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>

  )
}