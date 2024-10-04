"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import PokedexProgress from "@/app/components/PokedexProgress";
import SearchInput from "@/app/components/SearchInput";
import SortingDropdown, {
  SortingOption,
  sortingOptions,
} from "@/app/components/SortingDropdown";
import Pokemon from "@/business/domain/value-objects/Pokemon";
import PokedexCard from "@/app/components/PokedexCard";
import PokedexService from "@/business/application/services/PokedexService";
import PokedexRepository from "@/business/infrastructure/repositories/PokedexRepository";
import sortPokedex from "@/utils/sortPokedex";

export default function Pokedex(): ReactElement {
  const [sharedPokedex, setSharedPokedex] = useState<Pokemon[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<SortingOption>(
    sortingOptions.find(
      (sorting) => sorting.id === "caught-asc",
    ) as SortingOption,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = searchParams.get("data");

    if (data) {
      const pokedexRepository = new PokedexRepository();
      const pokedexService = new PokedexService(pokedexRepository);
      const pokedex = pokedexService.deserialize(data);

      setSharedPokedex(pokedex);
    }
  }, [searchParams]);

  const sortedPokemon = debouncedSearchTerm
    ? sortPokedex(sharedPokedex, selectedSorting).filter((pokemon) =>
        pokemon.name.includes(debouncedSearchTerm),
      )
    : sortPokedex(sharedPokedex, selectedSorting);

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
      {!sharedPokedex.length ? (
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
