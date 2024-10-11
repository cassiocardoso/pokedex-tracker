import { Fragment, ReactElement, useEffect } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PokemonService from "@/business/application/services/PokemonService";
import PokemonRepository from "@/business/infrastructure/repositories/PokemonRepository";
import PokemonCard from "@/app/components/PokemonCard";

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);

const DEFAULT_LIST_LIMIT: number = 30;

export default function PokemonList(): ReactElement {
  const { ref, inView } = useInView();
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
    initialPageParam: { offset: 0 },
    getNextPageParam: (_, __, lastPageParam) => {
      return {
        offset: lastPageParam.offset + DEFAULT_LIST_LIMIT,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60, // 1h
    refetchOnMount: false,
  });

  const handleClickLoadMoreButton = async () => {
    await fetchNextPage();
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
              ref={ref}
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
