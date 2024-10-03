import { ReactElement } from "react";
import { useSelect } from "downshift";

export interface SortingOption {
  id:
    | "name-asc"
    | "name-desc"
    | "height-asc"
    | "height-desc"
    | "weight-asc"
    | "weight-desc"
    | "caught-asc"
    | "caught-desc";
  label: string;
}

export const sortingOptions: SortingOption[] = [
  { id: "name-asc", label: "Name (A-Z)" },
  { id: "name-desc", label: "Name (Z-A)" },
  { id: "height-asc", label: "Height (low-high)" },
  { id: "height-desc", label: "Height (high-low)" },
  { id: "weight-asc", label: "Weight (low-high)" },
  { id: "weight-desc", label: "Weight (high-low)" },
  { id: "caught-asc", label: "Oldest Caught" },
  { id: "caught-desc", label: "Newest Caught" },
];

interface Props {
  defaultSelectedItem: SortingOption;
  setSelectedItem: (selectedItem: SortingOption) => void;
}

export default function SortingDropdown({
  defaultSelectedItem,
  setSelectedItem,
}: Props): ReactElement {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: sortingOptions,
    itemToString: (item: SortingOption | null) => (item ? item.label : ""),
    selectedItem: defaultSelectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      setSelectedItem(newSelectedItem),
  });

  return (
    <div className="w-full lg:max-w-80">
      <div className="flex flex-col gap-1">
        <label {...getLabelProps()}>Sort your Pokédex:</label>
        <div
          className="p-2 bg-white rounded w-full flex justify-between cursor-pointer text-gray-800"
          {...getToggleButtonProps()}
        >
          <span>{selectedItem ? selectedItem.label : "Oldest Caught"}</span>
          <span className="px-2">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
        </div>
      </div>
      <ul
        className={`absolute w-full rounded bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 text-gray-800 lg:max-w-80 ${
          !isOpen && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          sortingOptions.map((item, index) => (
            <li
              className="py-2 px-3 border-b cursor-pointer border-b-gray-200 flex flex-col hover:bg-gray-200"
              key={item.id}
              {...getItemProps({ item, index })}
            >
              <span>{item.label}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
