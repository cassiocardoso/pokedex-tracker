import Pokemon from "@/business/domain/value-objects/Pokemon";

export default interface IPokemonRepository {
  getAllPokemon({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<Pokemon[]>;
}
