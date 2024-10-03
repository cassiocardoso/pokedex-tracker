import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header(): ReactElement {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-4xl font-bold">Pokémon Tracker</h1>
        </Link>
        <Link
          href="/pokedex"
          className="flex gap-1 items-center hover:underline"
        >
          <Image src="/pokeball.svg" alt="pokeball" height={24} width={24} />
          <span>Your Pokédex</span>
        </Link>
      </div>
    </header>
  );
}
