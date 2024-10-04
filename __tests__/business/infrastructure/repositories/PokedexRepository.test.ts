import PokedexRepository from "@/business/infrastructure/repositories/PokedexRepository";
import Pokedex from "@/business/domain/models/Pokedex";
import Pokemon from "@/business/domain/value-objects/Pokemon";
import testPokemon from "../../../__fixtures__/pokemon";

jest.mock("@/business/domain/models/Pokedex");
jest.mock("@/business/domain/value-objects/Pokemon");

const mockPokemonList: Pokemon[] = [
  testPokemon({
    id: 1,
    name: "Bulbasaur",
    types: ["grass", "poison"],
    height: 7,
    weight: 69,
  }),
];

describe("PokedexRepository", () => {
  let pokedexRepository: PokedexRepository;
  let mockPokedex: jest.Mocked<Pokedex>;

  beforeEach(() => {
    mockPokedex = new Pokedex() as jest.Mocked<Pokedex>;
    pokedexRepository = new PokedexRepository();
    localStorage.clear();
  });

  describe("load", () => {
    it.skip("should load the Pokédex from localStorage", () => {
      localStorage.setItem("userPokedex", JSON.stringify(mockPokemonList));

      pokedexRepository.load();

      expect(mockPokedex.add).toHaveBeenCalledWith(mockPokemonList[0]);
    });

    it("should return an empty Pokédex if no data is found in localStorage", () => {
      const consoleSpy = jest
        .spyOn(console, "info")
        .mockImplementation(() => {});

      pokedexRepository.load();

      expect(mockPokedex.add).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        "No Pokédex data found in localStorage",
      );

      consoleSpy.mockRestore();
    });

    it("should log and throw an error if loading fails due to corrupted data", () => {
      localStorage.setItem("userPokedex", "INVALID_JSON");

      const errorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => pokedexRepository.load()).toThrow(
        "An error occurred while loading the Pokédex",
      );
      expect(errorSpy).toHaveBeenCalledWith(
        "Failed to load Pokédex data from localStorage:",
        expect.any(Error),
      );

      errorSpy.mockRestore();
    });
  });

  describe("save", () => {
    it("should save the Pokédex to localStorage", () => {
      mockPokedex.getAll.mockReturnValue(mockPokemonList);

      pokedexRepository.save(mockPokedex);

      const savedData = localStorage.getItem("userPokedex");
      expect(savedData).toEqual(JSON.stringify(mockPokemonList));
    });

    it("should log and throw an error if saving fails", () => {
      mockPokedex.getAll.mockReturnValue(mockPokemonList);
      const errorSpy = jest.spyOn(console, "log").mockImplementation(() => {});

      jest.spyOn(Storage.prototype, "setItem");
      Storage.prototype.setItem = jest.fn(() => {
        throw new Error("Storage full");
      });

      expect(() => pokedexRepository.save(mockPokedex)).toThrow(
        "An error occurred while saving the Pokédex",
      );
      expect(errorSpy).toHaveBeenCalledWith(
        "Failed to save Pokédex to localStorage:",
        expect.any(Error),
      );

      errorSpy.mockRestore();
    });
  });
});
