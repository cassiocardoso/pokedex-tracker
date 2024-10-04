import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import PokedexRepository from "@/business/infrastructure/repositories/PokedexRepository";
import PokedexService from "@/business/application/services/PokedexService";
import Pokemon from "@/business/domain/value-objects/Pokemon";
import Pokedex from "@/business/domain/models/Pokedex";

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
  const [pokedex, setPokedex] = useState<Pokedex>(new Pokedex());
  const [caughtPokemon, setCaughtPokemon] = useState<Pokemon[]>([]);
  const [numberOfSpeciesCaught, setNumberOfSpeciesCaught] = useState(0);

  // Hydrate context data from localStorage
  useEffect(() => {
    pokedexService = new PokedexService(pokedexRepository);
    const loadedPokedex = pokedexService.get();

    setPokedex(loadedPokedex);
    setCaughtPokemon(loadedPokedex.getAll());
    setNumberOfSpeciesCaught(loadedPokedex.getNumberOfSpeciesCaught());
  }, []);

  const catchPokemon = useCallback(
    (pokemon: Pokemon) => {
      if (!pokedex.isPokemonCaught(pokemon.id)) {
        pokedex.add(pokemon);

        const updatedPokemonList = [...pokedex.getAll()];
        setCaughtPokemon(updatedPokemonList);
        setNumberOfSpeciesCaught(updatedPokemonList.length);

        pokedexService.save();
      }
    },
    [pokedex],
  );

  const releasePokemon = useCallback(
    (pokemonId: number) => {
      pokedex.remove(pokemonId);

      const updatedPokemonList = [...pokedex.getAll()];
      setCaughtPokemon(updatedPokemonList);
      setNumberOfSpeciesCaught(updatedPokemonList.length);

      pokedexService.save();
    },
    [pokedex],
  );

  const getPokemon = (pokemonId: number): Pokemon | undefined => {
    return pokedexService.getPokemon(pokemonId);
  };

  const isPokemonCaught = (pokemonId: number): boolean => {
    return pokedexService.isPokemonCaught(pokemonId);
  };

  const exportToCsv = () => {
    const csvRows = [];

    const headers = ["id", "name", "types", "height", "weight", "caughtAt"];
    csvRows.push(headers.join(","));

    const pokemons = pokedexService.getAllPokemon();

    pokemons.forEach((pokemon) => {
      const row = [
        pokemon.id,
        pokemon.name,
        pokemon.types.join(";"),
        pokemon.height,
        pokemon.weight,
        pokemon.caughtAt ? pokemon.caughtAt.toISOString() : "",
      ];

      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pokedex.csv";
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link element
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const updatePokemonNote = (pokemonId: number, note: string) => {
    pokedexService.updatePokemonNote(pokemonId, note);
    pokedexService.save();
  };

  const getPokemonNote = (pokemonId: number) => {
    return pokedexService.getPokemonNote(pokemonId);
  };

  const sharePokedex = async () => {
    const serializedData = pokedexService.serialize();
    const link = `${window.location.origin}/share?data=${serializedData}`;

    await navigator.clipboard.writeText(link);

    toast.success("Pokédex link copied to clipboard");
  };

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
