import IPokemonRepository from "@/business/domain/repositories/IPokemonRepository";
import Pokemon from "@/business/domain/models/Pokemon";

export default class PokemonService {
  private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async getAllPokemon({
    limit = 30,
    offset = 0,
  }: {
    limit: number;
    offset: number;
  }): Promise<Pokemon[]> {
    return this.pokemonRepository.getAllPokemon({ limit, offset });
  }
}
