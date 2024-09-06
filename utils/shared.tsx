import confetti from "canvas-confetti";

import { ApiResquestFunction, InteractionsOptionsType } from "@/types";
import { gradient } from "@/components/primitives";

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function repeatRequests({
  functionResquest,
  maxAttempts = 10,
  actor,
}: {
  functionResquest: ApiResquestFunction;
  maxAttempts?: number;
  actor: string;
}) {
  const dataList = [];
  let attempt = 0;
  let cursor: string | undefined = undefined;

  do {
    const { data, cursor: newCursor } = await functionResquest({
      actor,
      cursor,
    });

    dataList.push(...data);
    cursor = newCursor;
    attempt++;
  } while (cursor && attempt < maxAttempts);

  return dataList;
}

export function returnRandomItensOnList<T>({
  quatityOfItens = 1,
  list,
}: {
  quatityOfItens: number;
  list: any[];
}): T[] {
  const randomItems: T[] = [];

  if (!list || !list.length) return [];
  while (randomItems.length < quatityOfItens) {
    const randomIndex = getRandomInt(0, list.length - 1);
    const randomItem = list[randomIndex];

    if (!randomItems.includes(randomItem)) randomItems.push(randomItem);
  }

  return randomItems;
}

export function hasDuplicateItems<T>({
  list,
  key,
}: {
  list: T[];
  key: keyof T;
}): boolean {
  const values: Set<T[keyof T]> = new Set();

  return list.some((item) => {
    if (values.has(item[key])) return true;
    values.add(item[key]);

    return false;
  });
}

export const handleConfetti = ({
  angle,
  particleCount,
  spread,
}: {
  angle: number;
  particleCount: number;
  spread: number;
}) => {
  confetti({
    angle,
    particleCount,
    spread,
    origin: { y: 0.6 },
  });
};

export const noPicture =
  "https://cdn.bsky.app/img/avatar/plain/did:plc:bbymmiqltjwzyrikqh362efy/bafkreied5mcljllqvtebhxsvrbj7gci6qvuqqvxbectveemrkqv2seqwne@jpeg";

export const interactionEmojis = {
  kiss: { emoji: "💋", style: `${gradient({ color: "pink", size: "sm" })}` },
  marry: { emoji: "👰‍♀️", style: "" },
  slap: { emoji: "🖐️", style: "" },
};

export const interactionList: InteractionsOptionsType[] = [
  {
    key: "marry",
    phrase: "Escolha alguem para",
    word: "CASAR",
    emoji: "👰‍♀️",
    iconStyle: "",
  },
  {
    key: "kiss",
    phrase: "Escolhar alguem para",
    word: "BEIJAR",
    emoji: "💋",
    iconStyle: `${gradient({ color: "pink", size: "sm" })}`,
  },
  {
    key: "slap",
    phrase: "Escolhar alguem para dar um",
    word: "TAPA",
    emoji: "🖐️",
    iconStyle: "",
  },
];
