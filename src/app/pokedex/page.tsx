"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import PokedexProgress from "@/app/components/PokedexProgress";
import SearchInput from "@/app/components/SearchInput";
import SortingDropdown, {
  SortingOption,
  sortingOptions,
} from "@/app/components/SortingDropdown";
import { usePokedex } from "@/services/PokedexContext";
import PokedexCard from "@/app/components/PokedexCard";
import sortPokedex from "@/utils/sortPokedex";

export default function Pokedex(): ReactElement {
  const { caughtPokemon, exportToCsv, sharePokedex } = usePokedex();
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    sortingOptions.find(
      (sorting) => sorting.id === "caught-asc",
    ) as SortingOption,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const sortedPokemon = debouncedSearchTerm
    ? sortPokedex(caughtPokemon, selectedSorting).filter((pokemon) =>
        pokemon.name.includes(debouncedSearchTerm),
      )
    : sortPokedex(caughtPokemon, selectedSorting);

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
  };

  return (
    <main className="flex flex-col gap-8 md:gap-16">
      <PokedexProgress />
      <div className="flex flex-col items-end justify-between gap-8 md:flex-row">
        <SearchInput onChange={handleChangeSearchInput} />
        <SortingDropdown
          defaultSelectedItem={selectedSorting}
          setSelectedItem={setSelectedSorting}
        />
        <button
          className="bg-white p-2 rounded text-black w-96 hover:bg-opacity-90"
          onClick={exportToCsv}
        >
          Export Pokédex to CSV
        </button>
        <button
          className="border border-white p-2 rounded text-white w-96 hover:bg-gray-800"
          onClick={sharePokedex}
        >
          Share Pokédex
        </button>
      </div>
      {!caughtPokemon.length ? (
        <div className="flex flex-col gap-4 items-center">
          <Image
            src="/pokeball.svg"
            alt="pokeball"
            height={256}
            width={256}
            className="grayscale"
          />
          <h3 className="text-3xl font-bold">No Pokémon found. :(</h3>
          <p>Go catch your first one and check back!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedPokemon.map((pokemon) => (
            <PokedexCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
}
