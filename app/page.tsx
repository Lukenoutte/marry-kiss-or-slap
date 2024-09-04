"use client";

import { BskyApi } from "@/api/bsky-api";
import UsernameCard from "@/components/username-card";
import { useState } from "react";

export default function Home() {
  const [serviceName, setServiceName] = useState("bsky.social")
  const [username, setUsername] = useState("")
  const bskyApi = new BskyApi()
  let followersList: BlueSkyUser[] = []
  let followsList: BlueSkyUser[] = []

  async function repeatRequests ({ functionResquest, maxAttempts = 5, actor }: {
    functionResquest: ApiResquestFunction, maxAttempts?: number, actor: string
  }) {
    const dataList = []
    let attempt = 0;
    let cursor: string | undefined = undefined;
    do {
      const { data, cursor: newCursor } = await functionResquest({actor, cursor});
      dataList.push(...data);
      cursor = newCursor;
      attempt++;
    } while (cursor && attempt < maxAttempts)
    return dataList
  }

  async function onClickContinue () {
    if (!username || !serviceName) return
    followsList = []
    followersList = []
    const actor = `${username}.${serviceName}`
    const [followersResult, followsResult] = await Promise.all([
      repeatRequests({ functionResquest: bskyApi.getFollowers, actor }),
      repeatRequests({ functionResquest: bskyApi.getFollows, actor })
    ])
    followersList.push(...followersResult)
    followsList.push(...followsResult)
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-md text-center justify-center">
        <h1 className="text-4xl">👰‍♀️💋🔪</h1>
        <div className="mt-8">
          <UsernameCard 
            username={username}
            setUsername={setUsername}
            serviceName={serviceName}
            setServiceName={setServiceName}
            onClickContinue={onClickContinue}
          />
        </div>
      </div>
    </section>
  );
}

type BlueSkyUser = {handle: string, displayName: string, avatar: string}
type ApiResquestFunction = ({ actor, cursor }: { actor: string, cursor?: string }) => Promise<{
  data: BlueSkyUser[],
  cursor?: string
}>