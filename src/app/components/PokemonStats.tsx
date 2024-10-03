import { ReactElement } from "react";
import { PokemonStatObject } from "@/business/domain/value-objects/Pokemon";
import { PokemonStat } from "@/business/domain/value-objects/PokemonStat";

interface Props {
  stats: PokemonStatObject[];
}

export default function PokemonStats({ stats }: Props): ReactElement {
  return (
    <div>
      {stats.map(({ name, value }) => {
        const { textColor, bgColor, label, maxValue } = getStatData(name);

        return (
          <div key={name}>
            <span className={`text-sm mb-1 ${textColor}`}>{label}</span>
            <div className="relative flex items-center">
              <div className="relative w-full h-2  overflow-hidden rounded-3xl bg-gray-100">
                <div
                  role="progressbar"
                  style={{ width: (value * 100) / maxValue }}
                  className={`flex h-full items-center justify-center text-white rounded-3xl ${bgColor}`}
                ></div>
              </div>
              <span className="ml-2 bg-white rounded-full text-gray-500 text-xs flex justify-center items-center ">
                {value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getStatData(stat: PokemonStat): {
  textColor: string;
  bgColor: string;
  label: string;
  maxValue: number;
} {
  return {
    hp: {
      textColor: `text-[#FF5959]`,
      bgColor: `bg-[#FF5959]`,
      label: "HP",
      maxValue: 255,
    },
    attack: {
      textColor: `text-[#F5AC78]`,
      bgColor: `bg-[#F5AC78]`,
      label: "Attack",
      maxValue: 190,
    },
    defense: {
      textColor: `text-[#FAE078]`,
      bgColor: `bg-[#FAE078]`,
      label: "Defense",
      maxValue: 250,
    },
    "special-attack": {
      textColor: `text-[#9DB7F5]`,
      bgColor: `bg-[#9DB7F5]`,
      label: "Sp. Attack",
      maxValue: 194,
    },
    "special-defense": {
      textColor: `text-[#A7DB8D]`,
      bgColor: `bg-[#A7DB8D]`,
      label: "Sp. Defense",
      maxValue: 250,
    },
    speed: {
      textColor: `text-[#FA92B2]`,
      bgColor: `bg-[#FA92B2]`,
      label: "Speed",
      maxValue: 200,
    },
  }[stat];
}
