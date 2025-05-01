import { POKEMON_TYPES, PokemonType } from "@/types/pokemon.types";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ChevronUp, ChevronDown, X } from "lucide-react";

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
  const toggleType = (type: PokemonType) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-6 shadow-md dark:shadow-gray-800/20 rounded-b-xl">
      <div className="flex flex-col gap-4">
        <button
          onClick={toggleSearch}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {showSearch ? "Hide search bar" : "Show search bar"}
          </span>
          {showSearch ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        <AnimatePresence initial={false}>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-6 mt-4">
                {/* Input input */}
                <div className="relative px-1">
                  <Search className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search a pokemon..."
                    className="w-full pl-10 pr-4 py-2 border text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>

                {/* badges types filter */}
                <div className="flex flex-wrap gap-2">
                  {POKEMON_TYPES.map((type) => {
                    const isSelected = selectedTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`px-3 py-1 capitalize text-sm font-medium rounded-full border transition-all ${isSelected
                            ? "bg-blue-500 dark:bg-blue-600 text-white border-blue-500 shadow"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400 border-gray-300 hover:bg-gray-200"
                          }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>

               
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    {selectedTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {type}
                        <button
                          className="hover:text-red-500"
                          onClick={() =>
                            onTypesChange(selectedTypes.filter((t) => t !== type))
                          }
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {selectedTypes.length > 0 && (
                    <button
                      onClick={onResetFilters}
                      className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white text-sm rounded-lg hover:bg-red-600"
                    >
                      Reset filters
                    </button>
                  )}
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
