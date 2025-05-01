import { PokemonListResponse, PokemonDetail } from "@/types/pokemon.types"

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
const MAX_CACHE_SIZE = 50

const pokemonListCache = new Map<string, Promise<PokemonListResponse>>()


export const getPokemonList = async (limit: number = 50, offset: number = 0): Promise<PokemonListResponse> => {
  const cacheKey = `list-${limit}-${offset}`;
  
  if (!pokemonListCache.has(cacheKey)) {
    pokemonListCache.set(cacheKey, 
      fetch(`${API_BASE_URL}?limit=${limit}&offset=${offset}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch Pokemon list');
          return res.json();
        })
    );
  }

  return pokemonListCache.get(cacheKey)!;
};

export const getPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const key = `pokemon-${name}`

  try {
    const cached = localStorage.getItem(key)
    if (cached) return JSON.parse(cached)
  } catch (_) { }

  const res = await fetch(`${API_BASE_URL}/${name}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon ${name} details`)
  }

  const data = await res.json()

  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('pokemon-'))
    if (keys.length >= MAX_CACHE_SIZE) {
      localStorage.removeItem(keys[0])
    }
    localStorage.setItem(key, JSON.stringify(data))
  } catch (_) {

  }

  return data
}

