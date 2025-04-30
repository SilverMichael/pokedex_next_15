export const getPokemonNameById = async (id: number): Promise<string | null> => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.name;
    } catch (e) {
      return null;
    }
  };
  