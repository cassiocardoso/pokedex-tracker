import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import PokemonCard from "@/app/components/PokemonCard";
import capitalize from "@/utils/capitalize";
import Pokemon from "@/business/domain/value-objects/Pokemon";
import { useDebounce } from "use-debounce";
import { usePokedex } from "@/services/PokedexContext";
import { usePathname } from "next/navigation";

export default function PokedexCard({
  pokemon,
}: {
  pokemon: Pokemon;
}): ReactElement {
  const { updatePokemonNote, getPokemonNote } = usePokedex();
  const initialNote = getPokemonNote(pokemon.id);
  const [note, setNote] = useState<string | undefined>(initialNote);
  const [debouncedNote] = useDebounce(note, 300);
  const pathname = usePathname();
  const isSharePage = pathname.startsWith("/share");

  useEffect(() => {
    if (debouncedNote) {
      updatePokemonNote(pokemon.id, debouncedNote);
    }
  }, [debouncedNote, updatePokemonNote, pokemon.id]);

  const handleChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setNote(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 bg-white text-gray-800 relative overflow-hidden rounded-xl z-0">
      <PokemonCard pokemon={pokemon} />
      <div className="flex flex-col gap-2 px-4 pb-4">
        <span className="font-bold text-2xl z-10">
          {capitalize(pokemon.name)} notes:
        </span>
        <textarea
          className="bg-gray-100 rounded-lg w-full p-4"
          name={`${pokemon.name}-notes`}
          id={`${pokemon.name}-notes`}
          cols={30}
          rows={5}
          defaultValue={initialNote}
          onChange={handleChangeNote}
          disabled={isSharePage}
        />
      </div>
    </div>
  );
}
