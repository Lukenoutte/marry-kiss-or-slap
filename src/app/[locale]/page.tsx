"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import UsernameProvider from "@/src/components/steps/username-provider";
import { BskyApi } from "@/src/api/bsky-api";
import { UserType } from "@/src/types";
import { repeatRequests } from "@/src/utils/shared-functions";
import { errorMessage } from "@/src/utils";
import RandomUserSelection from "@/src/components/steps/random-user-seletion";
import { gradient } from "@/src/components/primitives";
import ClassifyChosen from "@/src/components/steps/classify-chosen";

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
  const t = useTranslations();
  const localActive = useLocale() as "pt-br" | "en";

  async function retrieveFollowsAndFollowers() {
    if (!username || !serviceName) return;
    setCurrentStep(2);
    setFollowerList([]);
    setFollowList([]);
    const actor = `${username.trim()}.${serviceName.trim()}`.toLowerCase();

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
    const currentErroMessageList = errorMessage[localActive];

    if (error instanceof Error) {
      const errorMesage = error.message;

      if (errorMesage.includes("Actor not found"))
        return setMessageError(currentErroMessageList.invalid);

      return setMessageError(currentErroMessageList.default);
    }
    setMessageError(currentErroMessageList.default);
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
            <div className="mt-8 w-full px-2 lg:w-[350px]">
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
            <div className="mt-12 w-3/4 lg:w-[350px]">
              <p className="text-default-500 text-tiny">{t("warning")}</p>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <div className="flex flex-row items-center px-4">
              <span className="text-4xl mr-4">🤔</span>
              <h2 className="font-bold">{t("chosen_ones")}</h2>
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
