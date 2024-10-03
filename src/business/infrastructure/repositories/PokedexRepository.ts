import { IPokedexRepository } from "@/business/domain/repositories/IPokedexRepository";
import Pokedex from "@/business/domain/models/Pokedex";
import Pokemon from "@/business/domain/value-objects/Pokemon";

/**
 * This Pokédex uses localStorage as our "main DB". Of course another DB could
 * be used in a real-world scenario, but this gets the job done for the exercise
 * and gives us some functionality if there's no internet connectivity.
 */
export default class PokedexRepository implements IPokedexRepository {
  private readonly STORAGE_KEY = "userPokedex";

  save(pokedex: Pokedex) {
    const data = JSON.stringify(pokedex.getAll());
    localStorage.setItem(this.STORAGE_KEY, data);
  }

  load(): Pokedex {
    const pokedex = new Pokedex();
    const storedData = localStorage?.getItem(this.STORAGE_KEY);

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      parsedData.forEach((pokemon: Pokemon) => {
        pokedex.add(pokemon);
      });
    }

    return pokedex;
  }
}
