import { InteractionType } from "@/types";
import { gradient } from "@/components/primitives";

export const noPicture =
  "https://cdn.bsky.app/img/avatar/plain/did:plc:bbymmiqltjwzyrikqh362efy/bafkreied5mcljllqvtebhxsvrbj7gci6qvuqqvxbectveemrkqv2seqwne@jpeg";

export const interactionEmojis = {
  kiss: { emoji: "💋", style: `${gradient({ color: "pink", size: "sm" })}` },
  marry: { emoji: "👰‍♀️", style: "" },
  slap: { emoji: "🖐️", style: "" },
};

export const interactionList: InteractionType[] = [
  {
    key: "marry",
    quention: "Escolha alguém para",
    word: "CASAR",
    emoji: "👰‍♀️",
    iconStyle: "",
  },
  {
    key: "kiss",
    quention: "Escolha alguém para",
    word: "BEIJAR",
    emoji: "💋",
    iconStyle: `${gradient({ color: "pink", size: "sm" })}`,
  },
  {
    key: "slap",
    quention: "Escolha alguém para dar um",
    word: "TAPA",
    emoji: "🖐️",
    iconStyle: "",
  },
];

export const errorMessage = {
  empty: "Atenção: Campo vazio!",
  default: "Ops, algo deu errado :(",
  invalid: "Usuário não encontrado!",
};
