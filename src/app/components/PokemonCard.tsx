import React from 'react'
import Link from 'next/link';

interface PokemonCardProps {
  name: string;
  id: number;
}

export const PokemonCard = ({ name, id }: PokemonCardProps) => {
  return (
    <Link href={`/pokemon/${name}`} className="group">
      <div className="bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
        <div className="flex justify-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={name}
            className="w-32 h-32 object-contain"
          />
        </div>
        <h3 className="mt-2 text-center capitalize font-medium text-gray-800 group-hover:text-blue-600">
          {name}
        </h3>
      </div>
    </Link>
  );
};