import { POKEMON_TYPES, PokemonType } from "@/types/pokemon.types";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTypes: PokemonType[];
  onTypesChange: (types: PokemonType[]) => void;
  showSearch: boolean;
  toggleSearch: () => void;
  onResetFilters: () => void;
};

const SearchFilters = ({
  search,
  onSearchChange,
  selectedTypes,
  onTypesChange,
  showSearch,
  toggleSearch,
  onResetFilters,
}: Props) => {
  return (
    <div className="sticky top-0 bg-white z-10 p-4 shadow rounded-b-xl">
      <div className="flex flex-col gap-4">
        <button
          onClick={toggleSearch}
          className="flex items-center justify-center space-x-0.5 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          <span className="font-medium text-center text-gray-700">
            {showSearch ? 'Cacher la barre de recherche' : 'Afficher la barre de recherche'}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
              showSearch ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <AnimatePresence initial={false}>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Rechercher un Pokémon..."
                    className="flex-1 p-2 border rounded"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                  <select
                    multiple
                    className="p-2 border rounded min-w-[200px]"
                    onChange={(e) =>
                      onTypesChange(
                        Array.from(e.target.selectedOptions, (opt) => opt.value as PokemonType)
                      )
                    }
                    value={selectedTypes}
                  >
                    {POKEMON_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={onResetFilters}
                    className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Réinitialiser tout
                  </button>
                 
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchFilters;