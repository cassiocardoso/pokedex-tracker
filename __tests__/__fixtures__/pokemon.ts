import Pokemon from "@/business/domain/value-objects/Pokemon";

export default function testPokemon(overrides: Partial<Pokemon> = {}): Pokemon {
  return {
    id: 1,
    name: "Pokémon",
    height: 1,
    weight: 1,
    stats: [],
    types: [],
    sprites: {
      default: "",
      shiny: "",
    },
    caughtAt: null,
    ...overrides,
  };
}
