import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UserType = {
  handle: string;
  displayName: string;
  avatar: string;
  interaction?: "kiss" | "slap" | "marry";
};

export type ApiResquestFunction = ({
  actor,
  cursor,
}: {
  actor: string;
  cursor?: string;
}) => Promise<{
  data: UserType[];
  cursor?: string;
}>;

export type InteractionType = {
  key?: "kiss" | "slap" | "marry";
  quention?: string;
  emoji?: string;
  word?: string;
  iconStyle?: string;
};
