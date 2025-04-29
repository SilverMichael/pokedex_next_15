import { PokemonListResponse, PokemonDetail } from "@/types/pokemon.types"

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon'


export const getPokemonList = async (limit: number = 50, offset: number = 0): Promise<PokemonListResponse> => {
    const res = await fetch(`${API_BASE_URL}?limit=${limit}$offset=${offset}`)
    if (!res.ok) {
        throw new Error('Failed to fetch Pokemon list')
    }
    return res.json()
}

export const getPokemonDetail = async (name: string): Promise<PokemonDetail> => {
    const res = await fetch(`${API_BASE_URL}/${name}`)
    if (!res.ok) {
        throw new Error(`Failed to fetch Pokemon ${name} details`)
    }
    return res.json()
}

export const fetchCache = "force-cache"
export const revalidate = 86400