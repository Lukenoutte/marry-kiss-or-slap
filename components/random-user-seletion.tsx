"use client";

import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";

import CardSkeleton from "./card-skeleton";
import { ArrowLeftIcon, ArrowRightIcon, ShuffleIcon } from "./icons";

import {
  hasDuplicateItems,
  noPicture,
  returnRandomItensOnList,
} from "@/utils/shared";
import { BlueSkyUser } from "@/interfaces";

export default function RandomUserSelection({
  followerList,
  followList,
  isLoading,
  onClickBackButton,
  setCurrentStep,
  setChosenList,
  chosenList,
}: RandomUserSelectionProps) {
  function getRandomUsers() {
    let randomFollows: BlueSkyUser[] = [];
    let randomFollowers: BlueSkyUser[] = [];

    randomFollows = returnRandomItensOnList<BlueSkyUser>({
      list: followList,
      quatityOfItens: 2,
    });
    randomFollowers = returnRandomItensOnList<BlueSkyUser>({
      list: followerList,
      quatityOfItens: 1,
    });
    const selected: BlueSkyUser[] = [...randomFollows, ...randomFollowers];

    if (hasDuplicateItems<BlueSkyUser>({ list: selected, key: "handle" }))
      return getRandomUsers();
    setChosenList(selected);
  }

  useEffect(() => {
    if (followerList.length && followList.length && !chosenList.length) getRandomUsers();
  }, [isLoading]);

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex flex-row gap-4 justify-between">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
      <div className="flex flex-row gap-4 justify-between">
        {chosenList.map((user, index) => (
          <div key={index}>
            <Card className="border-none p-2" radius="lg">
              <Image
                isBlurred
                alt="Profile Pic"
                className="object-cover"
                height={200}
                isLoading={isLoading}
                src={user.avatar || noPicture}
                width={250}
              />
              <CardFooter>
                <p className="text-tiny font-bold">@{user.handle}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <div className="w-1/3 flex justify-start">
          <Button
            className="shadow-lg m"
            color="primary"
            disabled={isLoading}
            radius="full"
            startContent={<ArrowLeftIcon color="#0072F5" size={20} />}
            variant="bordered"
            onClick={onClickBackButton}
          />
        </div>
        <Button
          className="shadow-lg"
          color="primary"
          disabled={isLoading}
          endContent={<ShuffleIcon color="#0072F5" size={22} />}
          radius="full"
          variant="bordered"
          onClick={getRandomUsers}
        >
          Escolher Outros
        </Button>
        <div className="w-1/3 flex justify-end">
          <Button
            className="bg-gradient-to-tr from-[#0072F5] to-[#5EA2EF] text-white shadow-lg"
            color="primary"
            disabled={isLoading}
            endContent={<ArrowRightIcon color="white" size={20} />}
            radius="full"
            variant="shadow"
            onClick={() => setCurrentStep(3)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

type RandomUserSelectionProps = {
  followerList: BlueSkyUser[];
  followList: BlueSkyUser[];
  isLoading: boolean;
  onClickBackButton: () => void;
  setCurrentStep: (step: number) => void;
  setChosenList: (chosens: BlueSkyUser[]) => void;
  chosenList: BlueSkyUser[];
};
