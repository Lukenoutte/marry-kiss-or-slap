"use client";

import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { UserType, InteractionType } from "@/src/types";
import { getRandomInt, handleConfetti } from "@/src/utils/shared-functions";
import { interactionEmojis, noPicture } from "@/src/utils/index";
import { phraseKiss } from "@/src/utils";
import { phraseMarry } from "@/src/utils";
import { phraseSlap } from "@/src/utils";
import { interactionList } from "@/src/utils";

import PhraseCard from "../phrase-card";
import { gradient } from "../primitives";
import { ArrowLeftIcon } from "../icons";

export default function ClassifyChosen({
  chosenList,
  onClickBackButton,
}: ClassifyChosenProps) {
  const [popoverOpenIndex, setPopoverOpenIndex] = useState<number>(-1);
  const [selectedInteraction, setSelectedInteraction] =
    useState<InteractionType>({});
  const t = useTranslations();
  const localActive = useLocale() as "pt-br" | "en";

  const phrasesOptions: {
    kiss: ((user: string) => string)[];
    marry: ((user: string) => string)[];
    slap: ((user: string) => string)[];
  } = {
    kiss: phraseKiss[localActive],
    marry: phraseMarry[localActive],
    slap: phraseSlap[localActive],
  };

  const [interactionOptions, setInteractionOptions] = useState<
    InteractionType[]
  >(interactionList[localActive]);

  const [displayedPhraseList, setDisplayedPhraseList] = useState<
    DisplayedPhraseListType[]
  >([]);

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

  function onSelectUser(user: UserType) {
    if (user.interaction || !selectedInteraction.key) return;
    user.interaction = selectedInteraction.key;
    const selectedPhraseListByKey = phrasesOptions[selectedInteraction.key];
    const phrase =
      selectedPhraseListByKey[
        getRandomInt(0, selectedPhraseListByKey.length - 1)
      ];

    setDisplayedPhraseList([
      ...displayedPhraseList,
      {
        user,
        interation: selectedInteraction,
        phrase,
      },
    ]);
    setSelectedInteraction({});
    selectRandomInteraction();
    if (!interactionOptions.length)
      handleConfetti({ particleCount: 250, spread: 150, angle: 90 });
  }

  function beforeClickBackButton() {
    setSelectedInteraction({});
    setInteractionOptions(interactionList[localActive]);
    chosenList.forEach((user) => (user.interaction = undefined));
    onClickBackButton();
  }

  function HasSelectedInteraction() {
    return useMemo(() => {
      return !!Object.keys(selectedInteraction).length;
    }, [selectedInteraction]);
  }

  function onClickConfettiButton() {
    handleConfetti({
      angle: getRandomInt(55, 125),
      particleCount: getRandomInt(55, 150),
      spread: getRandomInt(70, 100),
    });
  }

  return (
    <div className="px-4 flex justify-center w-full">
      <div className="lg:w-4/5">
        {HasSelectedInteraction() && (
          <div className="mb-4">
            <span className="mr-2 font-bold">
              {selectedInteraction.quention}
            </span>
            <span className={`${gradient({ color: "pink", size: "sm" })} mr-2`}>
              {selectedInteraction.word}
            </span>
            <span className={`${selectedInteraction.iconStyle} text-4xl`}>
              {selectedInteraction.emoji}
            </span>
          </div>
        )}
        <div className="flex flex-row gap-4 justify-between">
          {chosenList.map((user, index) => (
            <div key={index}>
              <Popover isOpen={popoverOpenIndex === index} placement="bottom">
                <PopoverTrigger>
                  <Card
                    isFooterBlurred
                    isHoverable
                    isPressable
                    className="border-none p-2 cursor-pointer"
                    radius="lg"
                    onMouseEnter={() => setPopoverOpenIndex(index)}
                    onMouseLeave={() => setPopoverOpenIndex(-1)}
                    onPress={() => onSelectUser(user)}
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
                      height={140}
                      src={user.avatar || noPicture}
                      width={200}
                    />
                  </Card>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-4 py-2">
                    <div className="text-small font-bold">
                      {user.displayName}
                    </div>
                    <div className="text-tiny mt-1">@{user.handle}</div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
        {displayedPhraseList.map((phraseItem, index) => (
          <div key={index} className="mt-2">
            <PhraseCard phrase={phraseItem.phrase} user={phraseItem.user} />
          </div>
        ))}
        <div className="mt-8 flex justify-between">
          <Button
            className="shadow-lg"
            color="primary"
            radius="full"
            startContent={<ArrowLeftIcon color="#0072F5" size={20} />}
            title={t("go_back")}
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
    </div>
  );
}

type ClassifyChosenProps = {
  chosenList: UserType[];
  onClickBackButton: () => void;
};

type DisplayedPhraseListType = {
  phrase: (user: string) => string;
  interation: InteractionType;
  user: UserType;
};
