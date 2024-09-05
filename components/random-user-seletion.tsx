"use client";

import { Card, CardFooter, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";

import { returnRandomItensOnList } from "@/utils/shared";
import { BlueSkyUser } from "@/interfaces";

export default function RandomUserSelection({
  followersList,
  followsList,
  isLoading,
}: RandomUserSelectionProps) {
  const [usersSelected, setUsersSelected] = useState<BlueSkyUser[]>([]);

  function getRandomUsers() {
    let randomFollows: BlueSkyUser[] = [];
    let randomFollowers: BlueSkyUser[] = [];

    randomFollows = returnRandomItensOnList<BlueSkyUser>({
      list: followsList,
      quatityOfItens: 2,
    });
    randomFollowers = returnRandomItensOnList<BlueSkyUser>({
      list: followersList,
      quatityOfItens: 1,
    });
    setUsersSelected([...randomFollows, ...randomFollowers]);
    console.log("usersSelected", usersSelected);
  }

  useEffect(() => {
    if (followersList.length && followsList.length) getRandomUsers();
  }, [isLoading]);

  return (
    <div className="w-full">
      <div className="flex flex-row gap-4 justify-between">
        {usersSelected.map((user, index) => (
          <div key={index}>
            <Card className="border-none p-2" radius="lg">
              <Image
                isZoomed
                alt="Profile Pic"
                className="object-cover"
                height={200}
                isLoading={isLoading}
                src={user.avatar}
                width={250}
              />
              <CardFooter>
                <p className="text-tiny font-bold">@{user.handle}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        <Button
          className="shadow-lg mt-4"
          color="primary"
          radius="full"
          variant="bordered"
          onClick={getRandomUsers}
        >
          Escolher Outros
        </Button>
        <Button
          className="bg-gradient-to-tr from-[#0072F5] to-[#5EA2EF] text-white shadow-lg mt-4"
          radius="full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

type RandomUserSelectionProps = {
  followersList: BlueSkyUser[];
  followsList: BlueSkyUser[];
  isLoading: boolean;
};
