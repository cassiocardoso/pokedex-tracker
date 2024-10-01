import { Fragment, ReactElement, useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import PokemonService from "@/business/application/services/PokemonService";
import PokemonRepository from "@/business/infrastructure/repositories/PokemonRepository";

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);

export default function PokemonList(): ReactElement {
  const [limit, setLimit] = useState(30);
  const [offset, setOffset] = useState(0);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: async ({ pageParam }) =>
      pokemonService.getAllPokemon({
        limit: pageParam.limit,
        offset: pageParam.offset,
      }),
    initialPageParam: { limit, offset },
    getNextPageParam: (_, __, lastPageParam) => {
      return {
        limit: lastPageParam.limit,
        offset: lastPageParam.offset + lastPageParam.limit,
      };
    },
    placeholderData: keepPreviousData,
  });

  const handleClickLoadMoreButton = async () => {
    setOffset(offset + limit);
    await fetchNextPage();
  };

  if (status === "pending") return <p>loading...</p>;
  if (status === "error") return <p>Something went wrong! {error.message}</p>;

  return (
    <div>
      <h2>Pokémon List</h2>

      {!data ? (
        <p>No Pokémon found</p>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-8">
            {data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.map((pokemon) => (
                  <div key={pokemon.id}>{pokemon.name}</div>
                ))}
              </Fragment>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleClickLoadMoreButton}
              className="bg-white p-2 rounded text-black"
              disabled={isFetchingNextPage || !hasNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
