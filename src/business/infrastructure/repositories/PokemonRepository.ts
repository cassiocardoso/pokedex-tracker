import { GraphQLClient, gql } from "graphql-request";
import IPokemonRepository from "@/business/domain/repositories/IPokemonRepository";
import Pokemon from "@/business/domain/value-objects/Pokemon";
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
          weight
          pokemon_species_id
          pokemon_v2_pokemonstats_aggregate {
            nodes {
              base_stat
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
              sprite_default: sprites(path: "other.home.front_default")
              sprite_shiny: sprites(path: "other.home.front_shiny")
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
      height: pokemon.height / 10, // The height is in decimetres which is converted into metres by dividing by 10
      weight: pokemon.weight / 10, // The weight is in hectograms which is converted into kilograms by dividing by 10
      stats: pokemon.pokemon_v2_pokemonstats_aggregate.nodes.map((stat) => ({
        id: stat.stat_id,
        name: stat.pokemon_v2_stat.name,
        value: stat.base_stat,
      })),
      types: pokemon.pokemon_v2_pokemontypes_aggregate.nodes.map(
        (type) => type.pokemon_v2_type.name,
      ),
      sprites: {
        default:
          pokemon.pokemon_v2_pokemonsprites_aggregate.nodes[0].sprite_default,
        shiny:
          pokemon.pokemon_v2_pokemonsprites_aggregate.nodes[0].sprite_shiny,
      },
      caughtAt: null,
    };
  }
}
