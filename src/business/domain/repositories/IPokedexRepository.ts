import Pokedex from "@/business/domain/models/Pokedex";

export interface IPokedexRepository {
  save(pokedex: Pokedex): void;
  load(): Pokedex;
}
