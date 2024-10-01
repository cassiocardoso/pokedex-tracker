/**
 * Quick type definitions based on the PokeAPI response.
 * TODO: Improve by auto-generating all the types later
 */

type PokemonStatName =
  | "hp"
  | "attack"
  | "special-attack"
  | "defense"
  | "special-defense"
  | "speed";

type PokemonTypeName =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

interface PokeApiPokemonStatsAggregate {
  base_stat: number;
  id: number;
  stat_id: number;
  pokemon_v2_stat: {
    name: PokemonStatName;
  };
}

interface PokeApiPokemonTypesAggregate {
  id: number;
  slot: number;
  type_id: number;
  pokemon_v2_type: {
    name: PokemonTypeName;
  };
}

interface PokeApiPokemonSpritesAggregate {
  sprite_default: string;
  sprite_shiny: string;
}

export default interface PokeApiPokemon {
  id: number;
  name: string;
  height: number;
  pokemon_species_id: number;
  pokemon_v2_pokemonstats_aggregate: {
    nodes: PokeApiPokemonStatsAggregate[];
  };
  pokemon_v2_pokemontypes_aggregate: {
    nodes: PokeApiPokemonTypesAggregate[];
  };
  pokemon_v2_pokemonsprites_aggregate: {
    nodes: PokeApiPokemonSpritesAggregate[];
  };
}
