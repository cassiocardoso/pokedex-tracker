import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import PokedexRepository from "@/business/infrastructure/repositories/PokedexRepository";
import PokedexService from "@/business/application/services/PokedexService";
import Pokemon from "@/business/domain/value-objects/Pokemon";
import Pokedex from "@/business/domain/models/Pokedex";
import exportPokedexToCsv from "@/utils/exportPokedexToCsv";

interface IPokedexContext {
  catchPokemon: (pokemon: Pokemon) => void;
  releasePokemon: (pokemonId: number) => void;
  isPokemonCaught: (pokemonId: number) => boolean;
  getPokemon: (pokemonId: number) => Pokemon | undefined;
  caughtPokemon: Pokemon[];
  numberOfSpeciesCaught: number;
  exportToCsv: () => void;
  updatePokemonNote: (pokemonId: number, note: string) => void;
  getPokemonNote: (pokemonId: number) => string | undefined;
  sharePokedex: () => void;
}

const PokedexContext = createContext<IPokedexContext | undefined>(undefined);

export const usePokedex = (): IPokedexContext => {
  const context = useContext(PokedexContext);

  if (!context) {
    throw new Error("usePokedex must be used within a PokedexProvider");
  }

  return context;
};

const pokedexRepository = new PokedexRepository();
let pokedexService: PokedexService;

export default function PokedexProvider({ children }: { children: ReactNode }) {
  const [pokedex, setPokedex] = useState<Pokedex>(() => new Pokedex());
  const [caughtPokemon, setCaughtPokemon] = useState<Pokemon[]>(() =>
    pokedex.getAll(),
  );

  const numberOfSpeciesCaught = useMemo(
    () => caughtPokemon.length,
    [caughtPokemon],
  );

  // Hydrate context data from localStorage
  useEffect(() => {
    pokedexService = new PokedexService(pokedexRepository);
    const loadedPokedex = pokedexService.get();

    setPokedex(loadedPokedex);
    setCaughtPokemon(loadedPokedex.getAll());
  }, []);

  const catchPokemon = useCallback(
    (pokemon: Pokemon) => {
      if (!pokedex.isPokemonCaught(pokemon.id)) {
        pokedex.add(pokemon);
        setCaughtPokemon(pokedex.getAll());
        pokedexService.save();
      }
    },
    [pokedex],
  );

  const releasePokemon = useCallback(
    (pokemonId: number) => {
      pokedex.remove(pokemonId);
      setCaughtPokemon(pokedex.getAll());
      pokedexService.save();
    },
    [pokedex],
  );

  const getPokemon = useCallback<(pokemonId: number) => Pokemon | undefined>(
    (pokemonId: number) => {
      return pokedexService.getPokemon(pokemonId);
    },
    [],
  );

  const isPokemonCaught = useCallback((pokemonId: number) => {
    return pokedexService.isPokemonCaught(pokemonId);
  }, []);

  const exportToCsv = useCallback(() => {
    exportPokedexToCsv(caughtPokemon);
  }, [caughtPokemon]);

  const getPokemonNote = useCallback((pokemonId: number) => {
    return pokedexService.getPokemonNote(pokemonId);
  }, []);

  const updatePokemonNote = (pokemonId: number, note: string) => {
    pokedexService.updatePokemonNote(pokemonId, note);
    pokedexService.save();
  };

  const sharePokedex = useCallback(async () => {
    const serializedData = pokedexService.serialize();
    const link = `${window.location.origin}/share?data=${serializedData}`;

    await navigator.clipboard.writeText(link);

    toast.success("Pokédex link copied to clipboard");
  }, []);

  return (
    <PokedexContext.Provider
      value={{
        catchPokemon,
        releasePokemon,
        getPokemon,
        caughtPokemon,
        numberOfSpeciesCaught,
        isPokemonCaught,
        exportToCsv,
        updatePokemonNote,
        getPokemonNote,
        sharePokedex,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}
