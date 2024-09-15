import { gradient } from "@/src/components/primitives";
import { InteractionType } from "@/src/types";

export const interactionListEnglish: InteractionType[] = [
  {
    key: "marry",
    quention: "Choose someone to",
    word: "MARRY",
    emoji: "👰‍♀️",
    iconStyle: "",
  },
  {
    key: "kiss",
    quention: "Choose someone to",
    word: "KISS",
    emoji: "💋",
    iconStyle: `${gradient({ color: "pink", size: "sm" })}`,
  },
  {
    key: "slap",
    quention: "Choose someone to give a",
    word: "SLAP",
    emoji: "🖐️",
    iconStyle: "",
  },
];

export const errorMessageEnglish = {
  empty: "Warning: Empty field!",
  default: "Oops, something went wrong :(",
  invalid: "User not found!",
};
