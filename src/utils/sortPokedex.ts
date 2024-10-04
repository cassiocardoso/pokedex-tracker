import Pokemon from "@/business/domain/value-objects/Pokemon";
import { SortingOption } from "@/app/components/SortingDropdown";

export default function sortPokedex(
  caughtPokemon: Pokemon[],
  sorting: SortingOption,
): Pokemon[] {
  const [key, order] = sorting.id.split("-");
  return [...caughtPokemon].sort((a, b) => {
    if (key === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (key === "height" || key === "weight") {
      const valA = a[key];
      const valB = b[key];

      return order === "asc" ? valA - valB : valB - valA;
    } else if (key === "caught") {
      const valA = a.caughtAt ? new Date(a.caughtAt).getTime() : 0;
      const valB = b.caughtAt ? new Date(b.caughtAt).getTime() : 0;

      return order === "asc" ? valA - valB : valB - valA;
    }
    return 0;
  });
}
