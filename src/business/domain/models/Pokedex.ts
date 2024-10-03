import Pokemon from "@/business/domain/value-objects/Pokemon";

export default class Pokedex {
  private caughtPokemon = new Set<Pokemon>();

  add(pokemon: Pokemon): void {
    if (!this.caughtPokemon.has(pokemon)) {
      this.caughtPokemon.add(pokemon);
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

  getNUmberOfSpeciesCaught(): number {
    return this.caughtPokemon.size;
  }

  getPokemon(pokemonId: number): Pokemon | undefined {
    const pokemonArray = Array.from(this.caughtPokemon);

    return pokemonArray.find((pokemon) => pokemon.id === pokemonId);
  }

  isPokemonCaught(pokemonId: number): boolean {
    const pokemonArray = Array.from(this.caughtPokemon);

    return pokemonArray.some((pokemon) => pokemon.id === pokemonId);
  }
}
