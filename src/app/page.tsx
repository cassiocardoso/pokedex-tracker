"use client";

import { ReactElement } from "react";
import PokemonList from "@/app/components/PokemonList";
import PokedexProgress from "@/app/components/PokedexProgress";

export default function Home(): ReactElement {
  return (
    <main className="flex flex-col gap-8 md:gap-16">
      <PokedexProgress />
      <PokemonList />
    </main>
  );
}
