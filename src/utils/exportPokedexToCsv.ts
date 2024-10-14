import Pokemon from "@/business/domain/value-objects/Pokemon";

export default function exportPokedexToCsv(pokemons: Pokemon[]) {
  const csvRows = [];

  const headers = ["id", "name", "types", "height", "weight", "caughtAt"];
  csvRows.push(headers.join(","));

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
}
