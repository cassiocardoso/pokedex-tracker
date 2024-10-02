import { ReactElement } from "react";
import Image from "next/image";
import capitalize from "@/utils/capitalize";
import TypeBadge from "@/app/components/TypeBadge";
import PokemonStats from "@/app/components/PokemonStats";
import Pokemon from "@/business/domain/models/Pokemon";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props): ReactElement {
  return (
    <div className="bg-white text-gray-800 relative overflow-hidden p-4 rounded z-0">
      <span className="text-gray-300 font-black text-8xl absolute -top-4 -left-2 -z-10">
        {pokemon.id}
      </span>
      <div className="flex items-center gap-4">
        <span className="font-bold text-4xl z-10">
          {capitalize(pokemon.name)}
        </span>
        <div className="inline-flex gap-1">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
      <span className="font-medium text-xs text-gray-700">
        {pokemon.height}m - {pokemon.weight}kg
      </span>
      <div className="flex w-full">
        <div className="flex-1">
          <Image
            src={pokemon.sprites.default}
            alt={pokemon.name}
            height={512}
            width={512}
          />
        </div>
        <div className="flex-1">
          <PokemonStats stats={pokemon.stats} />
        </div>
      </div>
    </div>
  );
}
