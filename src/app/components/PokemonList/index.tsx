import { Fragment, ReactElement, useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import PokemonService from "@/business/application/services/PokemonService";
import PokemonRepository from "@/business/infrastructure/repositories/PokemonRepository";
import PokemonCard from "@/app/components/PokemonCard";

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);

const DEFAULT_LIST_LIMIT: number = 30;

export default function PokemonList(): ReactElement {
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
        offset: pageParam.offset,
      }),
    initialPageParam: { offset },
    getNextPageParam: (_, __, lastPageParam) => {
      return {
        offset: lastPageParam.offset + DEFAULT_LIST_LIMIT,
      };
    },
    placeholderData: keepPreviousData,
  });

  const handleClickLoadMoreButton = async () => {
    setOffset(offset + DEFAULT_LIST_LIMIT);
    await fetchNextPage();
  };

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Something went wrong! Error: {error.message}</p>;
  }

  return (
    <div>
      {!data ? (
        <p>No Pokémon found</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </Fragment>
            ))}
          </div>
          <div className="flex justify-center mt-8">
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
