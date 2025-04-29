
import React from 'react'
import PokemonSkeleton from './components/PokemonSkeleton'

const Loading = () => {
    return (
        <div className="container mx-auto py-8">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-8 mx-auto"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                    <PokemonSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

export default Loading