import { ReactElement } from "react";
import PokedexProgress from "@/app/components/PokedexProgress";

export default function Header(): ReactElement {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold">Pokédex Tracker</h1>
      </div>
      <PokedexProgress />
    </header>
  );
}
