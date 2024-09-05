"use client";

import { useState } from "react";

import { BskyApi } from "@/api/bsky-api";
import UsernameProvider from "@/components/username-provider";
import RandomUserSelection from "@/components/random-user-seletion";
import { gradient } from "@/components/primitives";
import { BlueSkyUser } from "@/interfaces";
import { repeatRequests } from "@/utils/shared";
import ClassifyChosen from "@/components/classify-chosen";

export default function Home() {
  const [serviceName, setServiceName] = useState<string>("bsky.social");
  const [username, setUsername] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chosenList, setChosenList] = useState<BlueSkyUser[]>([]);
  const [followerList, setFollowerList] = useState<BlueSkyUser[]>([]);
  const [followList, setFollowList] = useState<BlueSkyUser[]>([]);
  const bskyApi = new BskyApi();

  async function searchUserInfo() {
    if (!username || !serviceName) return;
    setCurrentStep(2);
    setFollowerList([]);
    setFollowList([]);
    const actor = `${username}.${serviceName}`;

    try {
      setIsLoading(true);
      const [followersResult, followsResult] = await Promise.all([
        repeatRequests({ functionResquest: bskyApi.getFollowers, actor }),
        repeatRequests({ functionResquest: bskyApi.getFollows, actor }),
      ]);

      setFollowerList(followersResult);
      setFollowList(followsResult);
    } catch (error) {
      setCurrentStep(1);
    } finally {
      setIsLoading(false);
    }
  }

  function onClickBackButton() {
    if (currentStep === 3) setCurrentStep(2);
    if (currentStep === 2) {
      setCurrentStep(1);
      setFollowerList([]);
      setFollowList([]);
      setChosenList([]);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center items-center">
        {currentStep === 1 && (
          <div>
            <h1 className="text-4xl">👰‍♀️💋🔪</h1>
            <div className="mt-8">
              <UsernameProvider
                serviceName={serviceName}
                setServiceName={setServiceName}
                setUsername={setUsername}
                username={username}
                onSubmit={searchUserInfo}
              />
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <div className="flex flex-row items-center">
              <span className="text-4xl mr-4">🤔</span>
              <h2 className={gradient({ color: "blue", size: "xs" })}>
                Os escolhidos foram...
              </h2>
            </div>
            <div className="mt-4">
              <RandomUserSelection
                chosenList={chosenList}
                followList={followList}
                followerList={followerList}
                isLoading={isLoading}
                setChosenList={setChosenList}
                setCurrentStep={setCurrentStep}
                onClickBackButton={onClickBackButton}
              />
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <div className="mt-4">
              <ClassifyChosen
                chosenList={chosenList}
                onClickBackButton={onClickBackButton}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}