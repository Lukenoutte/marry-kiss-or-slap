import { ApiResquestFunction } from "@/interfaces";

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function repeatRequests({
  functionResquest,
  maxAttempts = 5,
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
