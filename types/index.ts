import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type BlueSkyUser = {
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
  data: BlueSkyUser[];
  cursor?: string;
}>;

export type InteractionsOptionsType = {
  key?: "kiss" | "slap" | "marry";
  phrase?: string;
  emoji?: string;
  word?: string;
  iconStyle?: string;
};
