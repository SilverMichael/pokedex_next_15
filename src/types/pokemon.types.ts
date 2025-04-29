export interface PokemonResult {
    name: string,
    url: string
}
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[]
}
export interface PokemonDetail {
    name: string;
    id: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
    weight: number;
    height: number;
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    cries: {
        legacy: string
    }
}
