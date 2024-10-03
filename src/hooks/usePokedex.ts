import PokedexRepository from "@/business/infrastructure/repositories/PokedexRepository";
import PokedexService from "@/business/application/services/PokedexService";
import Pokemon from "@/business/domain/value-objects/Pokemon";

const pokedexRepository = new PokedexRepository();
const pokedexService = new PokedexService(pokedexRepository);

interface UsePokedex {
  savePokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemonId: number) => void;
  isPokemonCaught: (pokemonId: number) => boolean;
  getPokemon: (pokemonId: number) => Pokemon | undefined;
}

export default function usePokedex(): UsePokedex {
  const savePokemon = (pokemon: Pokemon) => {
    const caughtPokemon = {
      ...pokemon,
      caughtAt: new Date(),
    };
    pokedexService.addPokemon(caughtPokemon);
  };

  const removePokemon = (pokemonId: number) => {
    pokedexService.removePokemon(pokemonId);
  };

  const getPokemon = (pokemonId: number): Pokemon | undefined => {
    return pokedexService.getPokemon(pokemonId);
  };

  const isPokemonCaught = (pokemonId: number): boolean => {
    return pokedexService.isPokemonCaught(pokemonId);
  };

  return {
    savePokemon,
    removePokemon,
    isPokemonCaught,
    getPokemon,
  };
}
