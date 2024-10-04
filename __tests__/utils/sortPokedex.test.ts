import Pokemon from "@/business/domain/value-objects/Pokemon";
import sortPokedex from "@/utils/sortPokedex";
import { SortingOption } from "@/app/components/SortingDropdown";
import testPokemon from "../__fixtures__/pokemon";

const mockPokemon: Pokemon[] = [
  testPokemon({
    id: 1,
    name: "Bulbasaur",
    height: 7,
    weight: 69,
    caughtAt: new Date("2024-10-01T10:00:00Z"),
  }),
  testPokemon({
    id: 4,
    name: "Charmander",
    height: 6,
    weight: 85,
    caughtAt: new Date("2024-10-02T10:00:00Z"),
  }),
  testPokemon({
    id: 7,
    name: "Squirtle",
    height: 5,
    weight: 90,
    caughtAt: new Date("2024-10-03T10:00:00Z"),
  }),
  testPokemon({
    id: 25,
    name: "Pikachu",
    height: 4,
    weight: 60,
    caughtAt: new Date("2024-10-04T10:00:00Z"),
  }),
];

describe("sortPokedex", () => {
  it("sorts by name in ascending order", () => {
    const sorting: SortingOption = { id: "name-asc", label: "Name (A-Z)" };
    const sorted = sortPokedex(mockPokemon, sorting);

    expect(sorted.map((pokemon) => pokemon.name)).toEqual([
      "Bulbasaur",
      "Charmander",
      "Pikachu",
      "Squirtle",
    ]);
  });

  it("sorts by name in descending order", () => {
    const sorting: SortingOption = { id: "name-desc", label: "Name (Z-A)" };
    const sorted = sortPokedex(mockPokemon, sorting);

    expect(sorted.map((pokemon) => pokemon.name)).toEqual([
      "Squirtle",
      "Pikachu",
      "Charmander",
      "Bulbasaur",
    ]);
  });

  it("sorts by height in ascending order", () => {
    const sorting: SortingOption = {
      id: "height-asc",
      label: "Height (low-high)",
    };
    const sorted = sortPokedex(mockPokemon, sorting);

    expect(sorted.map((pokemon) => pokemon.height)).toEqual([4, 5, 6, 7]);
  });

  it("sorts by height in descending order", () => {
    const sorting: SortingOption = {
      id: "height-desc",
      label: "Height (high-low)",
    };
    const sorted = sortPokedex(mockPokemon, sorting);

    expect(sorted.map((pokemon) => pokemon.height)).toEqual([7, 6, 5, 4]);
  });

  it("sorts by weight in ascending order", () => {
    const sorting: SortingOption = {
      id: "weight-asc",
      label: "Weight (low-high)",
    };
    const sorted = sortPokedex(mockPokemon, sorting);

    expect(sorted.map((pokemon) => pokemon.weight)).toEqual([60, 69, 85, 90]);
  });

  it("sorts by weight in descending order", () => {
    const sorting: SortingOption = {
      id: "weight-desc",
      label: "Weight (high-low)",
    };
    const sorted = sortPokedex(mockPokemon, sorting);

    expect(sorted.map((pokemon) => pokemon.weight)).toEqual([90, 85, 69, 60]);
  });

  it("sorts by caught date in ascending order", () => {
    const sorting: SortingOption = { id: "caught-asc", label: "Oldest Caught" };
    const sorted = sortPokedex(mockPokemon, sorting);

    expect(sorted.map((pokemon) => pokemon.name)).toEqual([
      "Bulbasaur",
      "Charmander",
      "Squirtle",
      "Pikachu",
    ]);
  });

  it("sorts by caught date in descending order", () => {
    const sorting: SortingOption = {
      id: "caught-desc",
      label: "Newest Caught",
    };
    const sorted = sortPokedex(mockPokemon, sorting);

    expect(sorted.map((pokemon) => pokemon.name)).toEqual([
      "Pikachu",
      "Squirtle",
      "Charmander",
      "Bulbasaur",
    ]);
  });
});
