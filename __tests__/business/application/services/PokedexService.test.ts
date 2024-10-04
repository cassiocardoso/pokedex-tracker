import PokedexService from "@/business/application/services/PokedexService";
import { IPokedexRepository } from "@/business/domain/repositories/IPokedexRepository";
import Pokedex from "@/business/domain/models/Pokedex";
import Pokemon from "@/business/domain/value-objects/Pokemon";
import testPokemon from "../../../__fixtures__/pokemon";

describe("PokedexService", () => {
  let pokedexService: PokedexService;
  let mockPokedexRepository: jest.Mocked<IPokedexRepository>;
  let mockPokedex: jest.Mocked<Pokedex>;

  beforeEach(() => {
    mockPokedexRepository = {
      load: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<IPokedexRepository>;

    mockPokedex = {
      getAll: jest.fn(),
      getPokemon: jest.fn(),
      isPokemonCaught: jest.fn(),
      updatePokemonNote: jest.fn(),
      getPokemonNote: jest.fn(),
    } as unknown as jest.Mocked<Pokedex>;

    mockPokedexRepository.load.mockReturnValue(mockPokedex);
    pokedexService = new PokedexService(mockPokedexRepository);
  });

  describe("load and constructor", () => {
    it("should load the pokedex on instantiation", () => {
      expect(mockPokedexRepository.load).toHaveBeenCalled();
      expect(pokedexService.get()).toBe(mockPokedex);
    });
  });

  describe("save", () => {
    it("should save the pokedex using the repository", () => {
      pokedexService.save();
      expect(mockPokedexRepository.save).toHaveBeenCalledWith(mockPokedex);
    });

    it("should throw an error if saving the pokedex fails", () => {
      mockPokedexRepository.save.mockImplementation(() => {
        throw new Error("Save failed");
      });

      expect(() => pokedexService.save()).toThrow(
        "Could not save the Pokédex. Please try again.",
      );
    });
  });

  describe("getPokemon", () => {
    it("should return the correct pokemon if it exists", () => {
      const mockPokemon = testPokemon({
        id: 1,
        name: "Bulbasaur",
        types: ["grass", "poison"],
        height: 7,
        weight: 69,
      });
      mockPokedex.getPokemon.mockReturnValue(mockPokemon);

      const pokemon = pokedexService.getPokemon(1);
      expect(pokemon).toBe(mockPokemon);
      expect(mockPokedex.getPokemon).toHaveBeenCalledWith(1);
    });

    it("should throw an error if fetching the pokemon fails", () => {
      mockPokedex.getPokemon.mockImplementation(() => {
        throw new Error("Fetch failed");
      });

      expect(() => pokedexService.getPokemon(1)).toThrow(
        "An error occurred while retrieving the Pokémon.",
      );
    });
  });

  describe("isPokemonCaught", () => {
    it("should return true if the pokemon is caught", () => {
      mockPokedex.isPokemonCaught.mockReturnValue(true);

      const result = pokedexService.isPokemonCaught(1);
      expect(result).toBe(true);
      expect(mockPokedex.isPokemonCaught).toHaveBeenCalledWith(1);
    });

    it("should throw an error if checking the caught status fails", () => {
      mockPokedex.isPokemonCaught.mockImplementation(() => {
        throw new Error("Check failed");
      });

      expect(() => pokedexService.isPokemonCaught(1)).toThrow(
        "An error occurred while checking if the Pokémon is caught.",
      );
    });
  });

  describe("updatePokemonNote", () => {
    it("should update the note for the pokemon and save the pokedex", () => {
      pokedexService.updatePokemonNote(1, "Great Pokémon!");
      expect(mockPokedex.updatePokemonNote).toHaveBeenCalledWith(
        1,
        "Great Pokémon!",
      );
      expect(mockPokedexRepository.save).toHaveBeenCalledWith(mockPokedex);
    });

    it("should throw an error if note updating fails", () => {
      mockPokedex.updatePokemonNote.mockImplementation(() => {
        throw new Error("Update failed");
      });

      expect(() =>
        pokedexService.updatePokemonNote(1, "Great Pokémon!"),
      ).toThrow("An error occurred while updating the Pokémon note.");
    });
  });

  describe("getPokemonNote", () => {
    it("should return the note for the correct pokemon", () => {
      mockPokedex.getPokemonNote.mockReturnValue("Great Pokémon!");
      const note = pokedexService.getPokemonNote(1);
      expect(note).toBe("Great Pokémon!");
    });

    it("should throw an error if fetching the note fails", () => {
      mockPokedex.getPokemonNote.mockImplementation(() => {
        throw new Error("Fetch failed");
      });

      expect(() => pokedexService.getPokemonNote(1)).toThrow(
        "An error occurred while retrieving the Pokémon note.",
      );
    });
  });

  describe("serialization and deserialization", () => {
    it("should serialize the pokedex correctly", () => {
      const mockPokemonList: Pokemon[] = [
        testPokemon({
          id: 1,
          name: "Bulbasaur",
          types: ["grass", "poison"],
          height: 7,
          weight: 69,
        }),
      ];
      mockPokedex.getAll.mockReturnValue(mockPokemonList);

      const serializedData = pokedexService.serialize();
      expect(serializedData).toBe(
        encodeURIComponent(JSON.stringify(mockPokemonList)),
      );
    });

    it("should deserialize valid data correctly", () => {
      const mockPokemonList: Pokemon[] = [
        testPokemon({
          id: 1,
          name: "Bulbasaur",
          types: ["grass", "poison"],
          height: 7,
          weight: 69,
        }),
      ];
      const serializedData = encodeURIComponent(
        JSON.stringify(mockPokemonList),
      );

      const deserializedData = pokedexService.deserialize(serializedData);
      expect(deserializedData).toEqual(mockPokemonList);
    });
  });
});
