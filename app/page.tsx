"use client";

import { useState } from "react";

import { BskyApi } from "@/api/bsky-api";
import UsernameProvider from "@/components/username-provider";
import RandomUserSelection from "@/components/random-user-seletion";
import { gradient } from "@/components/primitives";
import { BlueSkyUser } from "@/interfaces";
import { repeatRequests } from "@/utils/shared";

export default function Home() {
  const [serviceName, setServiceName] = useState<string>("bsky.social");
  const [username, setUsername] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followersList, setFollowersList] = useState<BlueSkyUser[]>([]);
  const [followsList, setFollowsList] = useState<BlueSkyUser[]>([]);
  const bskyApi = new BskyApi();

  async function searchUserInfo() {
    if (!username || !serviceName) return;
    setCurrentStep(2);
    setFollowersList([]);
    setFollowsList([]);
    const actor = `${username}.${serviceName}`;

    try {
      setIsLoading(true);
      const [followersResult, followsResult] = await Promise.all([
        repeatRequests({ functionResquest: bskyApi.getFollowers, actor }),
        repeatRequests({ functionResquest: bskyApi.getFollows, actor }),
      ]);

      setFollowersList(followersResult);
      setFollowsList(followsResult);
    } catch (error) {
      setCurrentStep(1);
    } finally {
      setIsLoading(false);
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
                followersList={followersList}
                followsList={followsList}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}