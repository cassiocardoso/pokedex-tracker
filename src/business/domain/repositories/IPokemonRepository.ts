import Pokemon from "../models/Pokemon";

export default interface IPokemonRepository {
  getAllPokemon({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<Pokemon[]>;
}
