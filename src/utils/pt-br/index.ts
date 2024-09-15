import { gradient } from "@/src/components/primitives";
import { InteractionType } from "@/src/types";

export const interactionListPortuguese: InteractionType[] = [
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

export const errorMessagePortuguese = {
  empty: "Atenção: Campo vazio!",
  default: "Ops, algo deu errado :(",
  invalid: "Usuário não encontrado!",
};
