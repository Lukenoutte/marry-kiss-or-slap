import { gradient } from "@/src/components/primitives";

import { errorMessageEnglish, interactionListEnglish } from "./en";
import { errorMessagePortuguese, interactionListPortuguese } from "./pt-br";
import { phraseKissEnglish } from "./en/phrase-kiss";
import { phraseKissPortuguese } from "./pt-br/phrase-kiss";
import { phraseMarryEnglish } from "./en/phrase-marry";
import { phraseMarryPortuguese } from "./pt-br/phrase-marry";
import { phraseSlapPortuguese } from "./pt-br/phrase-slap";
import { phraseSlapEnglish } from "./en/phrase-slap";

export const noPicture =
  "https://cdn.bsky.app/img/avatar/plain/did:plc:bbymmiqltjwzyrikqh362efy/bafkreied5mcljllqvtebhxsvrbj7gci6qvuqqvxbectveemrkqv2seqwne@jpeg";

export const interactionEmojis = {
  kiss: { emoji: "💋", style: `${gradient({ color: "pink", size: "sm" })}` },
  marry: { emoji: "👰‍♀️", style: "" },
  slap: { emoji: "🖐️", style: "" },
};

export const errorMessage = {
  en: errorMessageEnglish,
  "pt-br": errorMessagePortuguese,
};

export const interactionList = {
  en: interactionListEnglish,
  "pt-br": interactionListPortuguese,
};

export const phraseKiss = {
  en: phraseKissEnglish,
  "pt-br": phraseKissPortuguese,
};

export const phraseMarry = {
  en: phraseMarryEnglish,
  "pt-br": phraseMarryPortuguese,
};

export const phraseSlap = {
  en: phraseSlapEnglish,
  "pt-br": phraseSlapPortuguese,
};
