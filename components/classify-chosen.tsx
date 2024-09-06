"use client";

import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { useEffect, useState } from "react";

import { ArrowLeftIcon } from "./icons";
import { gradient } from "./primitives";

import { BlueSkyUser, InteractionsOptionsType } from "@/types";
import {
  getRandomInt,
  handleConfetti,
  interactionEmojis,
  interactionList,
  noPicture,
} from "@/utils/shared";

export default function ClassifyChosen({
  chosenList,
  onClickBackButton,
}: ClassifyChosenProps) {
  const [popoverOpenIndex, setPopoverOpenIndex] = useState<number>(-1);
  const [selectedInteraction, setSelectedInteraction] =
    useState<InteractionsOptionsType>({});

  const [interactionOptions, setInteractionOptions] =
    useState<InteractionsOptionsType[]>(interactionList);

  function selectRandomInteraction() {
    if (!interactionOptions.length) return;
    const index = getRandomInt(0, interactionOptions.length - 1);
    const selected = interactionOptions[index];
    const updatedOptions = [...interactionOptions];

    updatedOptions.splice(index, 1);
    setInteractionOptions(updatedOptions);

    setSelectedInteraction(selected);
  }

  useEffect(() => {
    const hasInterationSelected = Object.keys(selectedInteraction).length;

    if (!hasInterationSelected) selectRandomInteraction();
  }, [chosenList]);

  function selectUser(user: BlueSkyUser) {
    if (user.interaction) return;
    user.interaction = selectedInteraction.key;
    setSelectedInteraction({});
    selectRandomInteraction();
    if (!interactionOptions.length)
      handleConfetti({ particleCount: 250, spread: 150, angle: 90 });
  }

  function beforeClickBackButton() {
    setSelectedInteraction({});
    setInteractionOptions(interactionList);
    chosenList.forEach((user) => (user.interaction = undefined));
    onClickBackButton();
  }

  function onClickConfettiButton() {
    handleConfetti({
      angle: getRandomInt(55, 125),
      particleCount: getRandomInt(55, 150),
      spread: getRandomInt(70, 100),
    });
  }

  return (
    <div>
      <span className="mr-2 font-bold">{selectedInteraction.phrase}</span>
      <span className={`${gradient({ color: "pink", size: "sm" })} mr-2`}>
        {selectedInteraction.word}
      </span>
      <span className={`${selectedInteraction.iconStyle} text-4xl`}>
        {selectedInteraction.emoji}
      </span>
      <div className="mt-3 flex flex-row gap-4 justify-between">
        {chosenList.map((user, index) => (
          <div key={index}>
            <Popover isOpen={popoverOpenIndex === index}>
              <PopoverTrigger>
                <Card
                  isHoverable
                  isPressable
                  className="border-none p-2 cursor-pointer"
                  radius="lg"
                  onMouseEnter={() => setPopoverOpenIndex(index)}
                  onMouseLeave={() => setPopoverOpenIndex(-1)}
                  onPress={() => selectUser(user)}
                >
                  {user.interaction && (
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                      <p
                        className={`${interactionEmojis[user.interaction].style} text-4xl`}
                      >
                        {interactionEmojis[user.interaction].emoji}
                      </p>
                    </CardHeader>
                  )}
                  <Image
                    isBlurred
                    isZoomed
                    alt="Profile Pic"
                    className="z-0 object-cover"
                    height={150}
                    src={user.avatar || noPicture}
                    width={200}
                  />
                </Card>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-4 py-2">
                  <div className="text-small font-bold">{user.displayName}</div>
                  <div className="text-tiny mt-1">@{user.handle}</div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
      {/* <div className="mt-8">
        <Card className="border-none px-4 py-6" radius="lg">
          <div className="flex justify-start">
            <User
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              className="mr-6"
              description={
                <Link
                  isExternal
                  href="https://twitter.com/jrgarciadev"
                  size="sm"
                >
                  @jrgarciadev
                </Link>
              }
              name="Junior Garcia"
            />
            <div className="border-l border-gray-300 pl-4">
              Test blablablablabla
            </div>
          </div>
        </Card>
      </div> */}
      <div className="mt-8 flex justify-between">
        <Button
          className="shadow-lg"
          color="primary"
          radius="full"
          startContent={<ArrowLeftIcon color="#0072F5" size={20} />}
          variant="bordered"
          onClick={beforeClickBackButton}
        />
        <Button
          className="shadow-lg"
          color="primary"
          radius="full"
          variant="bordered"
          onClick={onClickConfettiButton}
        >
          🎉🎊🎉🎉
        </Button>
      </div>
    </div>
  );
}

type ClassifyChosenProps = {
  chosenList: BlueSkyUser[];
  onClickBackButton: () => void;
};
