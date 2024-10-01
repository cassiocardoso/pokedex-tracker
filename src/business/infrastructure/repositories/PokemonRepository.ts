import { GraphQLClient, gql } from "graphql-request";
import IPokemonRepository from "@/business/domain/repositories/IPokemonRepository";
import Pokemon from "@/business/domain/models/Pokemon";
import PokeApiPokemon from "@/business/domain/models/PokeApiPokemon";

interface GetAllPokemonResponse {
  pokemon_v2_pokemon: PokeApiPokemon[];
}

export default class PokemonRepository implements IPokemonRepository {
  private graphqlClient: GraphQLClient;

  constructor() {
    this.graphqlClient = new GraphQLClient(
      "https://beta.pokeapi.co/graphql/v1beta",
    );
  }

  async getAllPokemon({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<Pokemon[]> {
    const query = gql`
      query AllPokemon($limit: Int, $offset: Int) {
        pokemon_v2_pokemon(limit: $limit, offset: $offset) {
          id
          name
          height
          pokemon_species_id
          pokemon_v2_pokemonstats_aggregate {
            nodes {
              base_stat
              id
              stat_id
              pokemon_v2_stat {
                name
              }
            }
          }
          pokemon_v2_pokemontypes_aggregate {
            nodes {
              id
              pokemon_v2_type {
                name
              }
              slot
              type_id
            }
          }
          pokemon_v2_pokemonsprites_aggregate {
            nodes {
              sprite_default: sprites(path: "front_default")
              sprite_shiny: sprites(path: "front_shiny")
            }
          }
        }
      }
    `;

    const response: GetAllPokemonResponse = await this.graphqlClient.request(
      query,
      { limit, offset },
    );

    return response.pokemon_v2_pokemon.map(this._mapToPokemon);
  }

  private _mapToPokemon(pokemon: PokeApiPokemon): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
    };
  }
}
