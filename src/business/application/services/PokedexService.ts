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
    this.pokedexRepository.save(this.pokedex);
  }

  get(): Pokedex {
    return this.pokedex;
  }

  getPokemon(pokemonId: number): Pokemon | undefined {
    return this.pokedex.getPokemon(pokemonId);
  }

  getAllPokemon(): Pokemon[] {
    return this.pokedex.getAll();
  }

  isPokemonCaught(pokemonId: number): boolean {
    return this.pokedex.isPokemonCaught(pokemonId);
  }

  updatePokemonNote(pokemonId: number, note: string): void {
    this.pokedex.updatePokemonNote(pokemonId, note);
    this.pokedexRepository.save(this.pokedex);
  }

  getPokemonNote(pokemonId: number): string | undefined {
    return this.pokedex.getPokemonNote(pokemonId);
  }

  serialize(): string {
    return encodeURIComponent(JSON.stringify(this.pokedex.getAll()));
  }

  deserialize(data: string): Pokemon[] {
    try {
      return JSON.parse(decodeURIComponent(data));
    } catch {
      throw new Error("Invalid Pokédex data");
    }
  }
}
