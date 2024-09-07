"use client";

import { useState } from "react";

import { BskyApi } from "@/api/bsky-api";
import UsernameProvider from "@/components/steps/username-provider";
import RandomUserSelection from "@/components/steps/random-user-seletion";
import { gradient } from "@/components/primitives";
import { UserType } from "@/types";
import { repeatRequests } from "@/utils/shared-functions";
import ClassifyChosen from "@/components/steps/classify-chosen";
import { errorMessage } from "@/utils";

export default function Home() {
  const [serviceName, setServiceName] = useState<string>("bsky.social");
  const [username, setUsername] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chosenList, setChosenList] = useState<UserType[]>([]);
  const [followerList, setFollowerList] = useState<UserType[]>([]);
  const [followList, setFollowList] = useState<UserType[]>([]);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [serviceNameError, setServiceNameError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");
  const bskyApi = new BskyApi();

  async function retrieveFollowsAndFollowers() {
    if (!username || !serviceName) return;
    setCurrentStep(2);
    setFollowerList([]);
    setFollowList([]);
    const actor = `${username.trim()}.${serviceName.trim()}`;

    try {
      setIsLoading(true);
      const [followersResult, followsResult] = await Promise.all([
        repeatRequests({ functionResquest: bskyApi.getFollowers, actor }),
        repeatRequests({ functionResquest: bskyApi.getFollows, actor }),
      ]);

      setFollowerList(followersResult);
      setFollowList(followsResult);
      setMessageError("");
    } catch (error) {
      handleErrorMessage(error);
      setCurrentStep(1);
    } finally {
      setIsLoading(false);
    }
  }

  function handleErrorMessage(error: unknown) {
    if (error instanceof Error) {
      const errorMesage = error.message;

      if (errorMesage.includes("Actor not found"))
        return setMessageError(errorMessage.invalid);

      return setMessageError(errorMessage.default);
    }
    setMessageError(errorMessage.default);
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
          <div className="flex-col flex items-center">
            <h1 className="text-5xl">
              👰‍♀️
              <span className={gradient({ color: "pink" })}>💋</span>
              🖐️
            </h1>
            <div className="mt-8 w-[350px]">
              <UsernameProvider
                errorHandler={{
                  usernameError,
                  setUsernameError,
                  serviceNameError,
                  setServiceNameError,
                  messageError,
                  setMessageError,
                }}
                serviceName={serviceName}
                setServiceName={setServiceName}
                setUsername={setUsername}
                username={username}
                onSubmit={retrieveFollowsAndFollowers}
              />
            </div>
            <div className="mt-12 w-[350px]">
              <p className="text-default-500 text-tiny">
                Lembre-se de que o objetivo é entreter, então, se algo te deixar
                desconfortável, não hesite em nos contatar.
              </p>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <div className="flex flex-row items-center">
              <span className="text-4xl mr-4">🤔</span>
              <h2 className="font-bold">Os escolhidos foram...</h2>
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
          <div style={{ display: currentStep === 3 ? "block" : "none" }}>
            <div>
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
