"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import PokedexProgress from "@/app/components/PokedexProgress";
import { usePokedex } from "@/services/PokedexContext";
import PokemonCard from "@/app/components/PokemonCard";
import SortingDropdown, {
  SortingOption,
  sortingOptions,
} from "@/app/components/SortingDropdown";
import Pokemon from "@/business/domain/value-objects/Pokemon";
import SearchInput from "@/app/components/SearchInput";

export default function Pokedex(): ReactElement {
  const { caughtPokemon } = usePokedex();
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
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
}

function sortPokedex(
  caughtPokemon: Pokemon[],
  sorting: SortingOption,
): Pokemon[] {
  const [key, order] = sorting.id.split("-");
  return [...caughtPokemon].sort((a, b) => {
    if (key === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (key === "height" || key === "weight") {
      const valA = a[key];
      const valB = b[key];

      return order === "asc" ? valA - valB : valB - valA;
    } else if (key === "caught") {
      const valA = a.caughtAt ? new Date(a.caughtAt).getTime() : 0;
      const valB = b.caughtAt ? new Date(b.caughtAt).getTime() : 0;

      return order === "asc" ? valA - valB : valB - valA;
    }
    return 0;
  });
}
