import Pokemon from "@/business/domain/value-objects/Pokemon";

export default class Pokedex {
  private caughtPokemon = new Set<Pokemon>();

  add(pokemon: Pokemon): void {
    if (!this.caughtPokemon.has(pokemon)) {
      this.caughtPokemon.add({
        ...pokemon,
        caughtAt: new Date(),
      });
    }
  }

  remove(pokemonId: number): void {
    this.caughtPokemon.forEach((pokemon) => {
      if (pokemon.id === pokemonId) {
        this.caughtPokemon.delete(pokemon);
        return;
      }
    });
  }

  getAll(): Pokemon[] {
    return Array.from(this.caughtPokemon);
  }

  getPokemon(pokemonId: number): Pokemon | undefined {
    const pokemonArray = Array.from(this.caughtPokemon);

    return pokemonArray.find((pokemon) => pokemon.id === pokemonId);
  }

  isPokemonCaught(pokemonId: number): boolean {
    const pokemonArray = Array.from(this.caughtPokemon);

    return pokemonArray.some((pokemon) => pokemon.id === pokemonId);
  }

  updatePokemonNote(pokemonId: number, note: string): void {
    const pokemonArray = Array.from(this.caughtPokemon);

    const pokemon = pokemonArray.find((pokemon) => pokemon.id === pokemonId);

    if (!pokemon) return;

    pokemon.note = note;
  }

  getPokemonNote(pokemonId: number): string | undefined {
    const pokemonArray = Array.from(this.caughtPokemon);

    const pokemon = pokemonArray.find((pokemon) => pokemon.id === pokemonId);

    if (!pokemon) return;

    return pokemon.note;
  }
}
