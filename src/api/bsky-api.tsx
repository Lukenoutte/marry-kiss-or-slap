import { UserType } from "@/src/types";
import FetchWrapper from "@/src/utils/fetch";

const fetch = new FetchWrapper("https://public.api.bsky.app");

export class BskyApi {
  async getFollowers({
    actor,
    cursor,
  }: {
    actor: string;
    cursor?: string;
  }): Promise<{ cursor?: string; data: UserType[] }> {
    let query: QueryType = { actor, limit: 100 };

    if (cursor) query = { ...query, cursor };
    const { followers, cursor: newCursor } =
      await fetch.request<FollowersResponse>({
        endpoint: "/xrpc/app.bsky.graph.getFollowers",
        query,
      });

    return { data: followers, cursor: newCursor };
  }

  async getFollows({
    actor,
    cursor,
  }: {
    actor: string;
    cursor?: string;
  }): Promise<{ cursor?: string; data: UserType[] }> {
    let query: QueryType = { actor, limit: 100 };

    if (cursor) query = { ...query, cursor };
    const { follows, cursor: newCursor } = await fetch.request<FollowsResponse>(
      {
        endpoint: "/xrpc/app.bsky.graph.getFollows",
        query,
      },
    );

    return { data: follows, cursor: newCursor };
  }
}

type QueryType = { actor: string; limit: number; cursor?: string };

type FollowersResponse = {
  followers: UserType[];
  cursor?: string;
};

type FollowsResponse = {
  follows: UserType[];
  cursor?: string;
};
