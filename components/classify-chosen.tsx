"use client";

import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { useState } from "react";
import confetti from "canvas-confetti";

import { ArrowLeftIcon } from "./icons";

import { BlueSkyUser } from "@/interfaces";
import { getRandomInt, noPicture } from "@/utils/shared";

export default function ClassifyChosen({
  chosenList,
  onClickBackButton,
}: ClassifyChosenProps) {
  const [popoverOpenIndex, setPopoverOpenIndex] = useState<number>(-1);

  const handleConfetti = () => {
    confetti({
      angle: getRandomInt(55, 125),
      particleCount: getRandomInt(55, 250),
      spread: getRandomInt(70, 100),
      origin: { y: 0.6 },
    });
  };

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        {chosenList.map((user, index) => (
          <div key={index}>
            <Popover isOpen={popoverOpenIndex === index}>
              <PopoverTrigger>
                <Card
                  isHoverable
                  className="border-none p-2 cursor-pointer"
                  radius="lg"
                  onMouseEnter={() => setPopoverOpenIndex(index)}
                  onMouseLeave={() => setPopoverOpenIndex(-1)}
                >
                  <Image
                    isBlurred
                    isZoomed
                    alt="Profile Pic"
                    className="object-cover"
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
      <div className="mt-8 flex justify-between">
        <Button
          className="shadow-lg"
          color="primary"
          radius="full"
          startContent={<ArrowLeftIcon color="#0072F5" size={20} />}
          variant="bordered"
          onClick={onClickBackButton}
        />
        <Button
          className="bg-gradient-to-tr from-[#0072F5] to-[#5EA2EF] text-white shadow-lg"
          color="primary"
          radius="full"
          variant="shadow"
          onClick={handleConfetti}
        >
          UHUUUUULL!!! 🎉🎊🎉🎉
        </Button>
      </div>
    </div>
  );
}

type ClassifyChosenProps = {
  chosenList: BlueSkyUser[];
  onClickBackButton: () => void;
};
