'use client'

const PokemonSkeleton = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="animate-pulse">
                <div className="bg-gray-200 h-32 w-full rounded"></div>
                <div className="mt-2 bg-gray-200 h-6 w-3/4 mx-auto rounded"></div>
            </div>
        </div>
    )
}

export default PokemonSkeleton