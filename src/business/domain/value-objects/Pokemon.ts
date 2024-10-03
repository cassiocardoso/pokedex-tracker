import { PokemonStat } from "@/business/domain/value-objects/PokemonStat";
import { PokemonType } from "@/business/domain/value-objects/PokemonType";

export interface PokemonStatObject {
  id: number;
  name: PokemonStat;
  value: number;
}

export default interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: PokemonStatObject[];
  types: PokemonType[];
  sprites: {
    default: string;
    shiny: string;
  };
  caughtAt: Date | null;
  note?: string;
}
