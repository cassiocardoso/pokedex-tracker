import { ChangeEvent, ReactElement } from "react";

export default function SearchInput({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}): ReactElement {
  return (
    <div className="w-full flex flex-col gap-1 relative">
      <label htmlFor="searchInput">Search for a Pokémon:</label>
      <input
        type="text"
        id="searchInput"
        defaultValue=""
        onChange={onChange}
        placeholder="Search for a Pokémon..."
        className="p-2 bg-white rounded flex justify-between cursor-pointer text-gray-800 hover:bg-opacity-90"
      />
    </div>
  );
}
