import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    <header className="flex items-center justify-center">
      <h1 className="text-4xl font-bold">Pokédex Tracker</h1>
    </header>
  );
}
