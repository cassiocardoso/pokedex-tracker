import { usePokedex } from "@/services/PokedexContext";
import { usePathname } from "next/navigation";

const TOTAL_NUMBER_OF_POKEMON_SPECIES: number = 1025;

export default function PokedexProgress() {
  const { numberOfSpeciesCaught } = usePokedex();
  const pathname = usePathname();
  const isSharePage = pathname.startsWith("/share");

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">
        {isSharePage ? "Progress:" : "Your Progress:"}
      </h2>

      <div className="relative flex items-center">
        <div className="relative w-full h-4 overflow-hidden rounded-3xl bg-gray-100">
          <div
            role="progressbar"
            style={{
              width:
                (numberOfSpeciesCaught * 100) / TOTAL_NUMBER_OF_POKEMON_SPECIES,
            }}
            className={`flex h-full items-center justify-center text-white rounded-3xl bg-red-400`}
          ></div>
        </div>
        <span className="ml-2 text-white text-xs flex flex-row justify-center items-center w-20">
          {numberOfSpeciesCaught} / {TOTAL_NUMBER_OF_POKEMON_SPECIES}
        </span>
      </div>
    </div>
  );
}
