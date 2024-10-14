import Pokedex from "@/business/domain/models/Pokedex";
import { IPokedexRepository } from "@/business/domain/repositories/IPokedexRepository";
import Pokemon from "@/business/domain/value-objects/Pokemon";

export default class PokedexService {
  private readonly pokedex: Pokedex;
  private pokedexRepository: IPokedexRepository;

  constructor(pokedexRepository: IPokedexRepository) {
    this.pokedexRepository = pokedexRepository;
    this.pokedex = this.pokedexRepository.load();
  }

  save() {
    try {
      this.pokedexRepository.save(this.pokedex);
    } catch (error) {
      console.error("Failed to save the Pokédex to the repository:", error);
      throw new Error("Could not save the Pokédex. Please try again.");
    }
  }

  get(): Pokedex {
    return this.pokedex;
  }

  getPokemon(pokemonId: number): Pokemon | undefined {
    try {
      return this.pokedex.getPokemon(pokemonId);
    } catch (error) {
      console.error(`Failed to retrieve Pokémon with ID ${pokemonId}:`, error);
      throw new Error("An error occurred while retrieving the Pokémon.");
    }
  }

  isPokemonCaught(pokemonId: number): boolean {
    try {
      return this.pokedex.isPokemonCaught(pokemonId);
    } catch (error) {
      console.error(
        `Failed to check if Pokémon with ID ${pokemonId} is caught:`,
        error,
      );
      throw new Error(
        "An error occurred while checking if the Pokémon is caught.",
      );
    }
  }

  updatePokemonNote(pokemonId: number, note: string): void {
    if (!note) {
      throw new Error("Invalid note provided.");
    }

    try {
      this.pokedex.updatePokemonNote(pokemonId, note);
      this.save();
    } catch (error) {
      console.error(
        `Failed to update the note for Pokémon with ID ${pokemonId}:`,
        error,
      );
      throw new Error("An error occurred while updating the Pokémon note.");
    }
  }

  getPokemonNote(pokemonId: number): string | undefined {
    try {
      return this.pokedex.getPokemonNote(pokemonId);
    } catch (error) {
      console.error(
        `Failed to retrieve the note for Pokémon with ID ${pokemonId}:`,
        error,
      );
      throw new Error("An error occurred while retrieving the Pokémon note.");
    }
  }

  serialize(): string {
    try {
      return encodeURIComponent(JSON.stringify(this.pokedex.getAll()));
    } catch (error) {
      console.error("Failed to serialize the Pokédex:", error);
      throw new Error("An error occurred while serializing the Pokédex.");
    }
  }

  deserialize(data: string): Pokemon[] {
    try {
      return JSON.parse(decodeURIComponent(data));
    } catch {
      throw new Error("Invalid Pokédex data");
    }
  }
}
