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
    try {
      const data = JSON.stringify(pokedex.getAll());
      localStorage.setItem(this.STORAGE_KEY, data);
    } catch (error) {
      console.log("Failed to save Pokédex to localStorage:", error);
      throw new Error("An error occurred while saving the Pokédex");
    }
  }

  load(): Pokedex {
    const pokedex = new Pokedex();
    try {
      const storedData = localStorage?.getItem(this.STORAGE_KEY);

      if (!storedData) {
        console.info("No Pokédex data found in localStorage");
        return pokedex;
      }

      const parsedData = JSON.parse(storedData);

      parsedData.forEach((pokemon: Pokemon) => {
        pokedex.add(pokemon);
      });
    } catch (error) {
      console.error("Failed to load Pokédex data from localStorage:", error);
      throw new Error("An error occurred while loading the Pokédex");
    }

    return pokedex;
  }
}
