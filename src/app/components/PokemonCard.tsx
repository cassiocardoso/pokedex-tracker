import { ReactElement, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import capitalize from "@/utils/capitalize";
import TypeBadge from "@/app/components/TypeBadge";
import PokemonStats from "@/app/components/PokemonStats";
import Pokemon from "@/business/domain/value-objects/Pokemon";
import { usePokedex } from "@/services/PokedexContext";
import formatDate from "@/utils/formatDate";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props): ReactElement {
  const { catchPokemon, releasePokemon, getPokemon } = usePokedex();
  const initialIsCaught = Boolean(getPokemon(pokemon.id)?.caughtAt);
  const pokemonCaughtDate = getPokemon(pokemon.id)?.caughtAt;

  const handleClickPokeBall = useCallback(() => {
    const updatedIsCaught = !initialIsCaught;

    if (updatedIsCaught) {
      catchPokemon(pokemon);
      toast.success(`${capitalize(pokemon.name)} has been caught!`, {
        icon: () => (
          <Image src="/pokeball.svg" alt="pokeball" height={24} width={24} />
        ),
      });
    } else {
      releasePokemon(pokemon.id);
      toast.info(`${capitalize(pokemon.name)} has been released!`, {
        icon: () => (
          <Image
            src="/pokeball.svg"
            alt="pokeball"
            height={24}
            width={24}
            className="grayscale"
          />
        ),
      });
    }
  }, [initialIsCaught, catchPokemon, pokemon, releasePokemon]);

  return (
    <div className="bg-white text-gray-800 relative overflow-hidden p-4 rounded-xl z-0">
      <span className="text-gray-300 font-black text-8xl absolute -top-4 -left-2 -z-10">
        {pokemon.id}
      </span>
      <div
        className="absolute cursor-pointer top-2 right-2"
        onClick={handleClickPokeBall}
      >
        <Image
          src="/pokeball.svg"
          alt="pokeball"
          height={32}
          width={32}
          className={!initialIsCaught ? "grayscale" : ""}
        />
      </div>
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
      <div className="flex w-full gap-4">
        <div className="flex-1 flex flex-col justify-between">
          <Image
            priority
            src={pokemon.sprites.default}
            alt={pokemon.name}
            height={512}
            width={512}
          />
          {pokemonCaughtDate && (
            <span className="text-xs text-gray-500 font-bold text-center">
              Caught at: {`${formatDate(pokemonCaughtDate)}`}
            </span>
          )}
        </div>
        <div className="flex-1">
          <PokemonStats stats={pokemon.stats} />
        </div>
      </div>
    </div>
  );
}
