import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { typeColors } from '@/types/pokemon.types';

interface PokemonCardProps {
  name: string;
  id: number;
  sprite: string;
  types: string[]
}

export const PokemonCard = ({ name, id, sprite, types }: PokemonCardProps) => {
  return (
    <Link href={`/pokemon/${name}`} className="group">
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
            className='object-contain'
          />
        </div>
        <p className='text-gray-500'>N°{id}</p>
        <h2 className="mt-1  capitalize font-medium text-gray-950 group-hover:text-blue-600">
          {name}
        </h2>
        <div className="flex gap-2">
          {types.map(type => (
            <span key={type} className={`px-3 py-1 mt-1 text-xs rounded-md text-white ${typeColors[type] || 'bg-gray-400'}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};