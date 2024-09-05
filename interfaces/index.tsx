export type BlueSkyUser = {
  handle: string;
  displayName: string;
  avatar: string;
};

export type ApiResquestFunction = ({
  actor,
  cursor,
}: {
  actor: string;
  cursor?: string;
}) => Promise<{
  data: BlueSkyUser[];
  cursor?: string;
}>;
