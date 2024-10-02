import { PokemonStat } from "@/business/domain/value-objects/PokemonStat";
import { PokemonType } from "@/business/domain/value-objects/PokemonType";

/**
 * Quick type definitions based on the PokeAPI response.
 * TODO: Improve by auto-generating all the types later
 */

interface PokeApiPokemonStatsAggregate {
  base_stat: number;
  stat_id: number;
  pokemon_v2_stat: {
    name: PokemonStat;
  };
}

interface PokeApiPokemonTypesAggregate {
  id: number;
  slot: number;
  type_id: number;
  pokemon_v2_type: {
    name: PokemonType;
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
  weight: number;
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
