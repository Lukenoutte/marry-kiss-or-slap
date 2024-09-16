"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LocalSwitch() {
  const languages = [
    { key: "pt-br", label: "🇧🇷" },
    { key: "en", label: "🇺🇸" },
  ];
  const localActive = useLocale();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function useOnChangeSelect(selected: any) {
    const nextLocale = selected.currentKey;

    if (!nextLocale) return;

    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  }

  return (
    <Select
      aria-labelledby="Language"
      className="w-[70px]"
      defaultSelectedKeys={[localActive]}
      isDisabled={isPending}
      size="sm"
      onSelectionChange={useOnChangeSelect}
    >
      {languages.map((language) => (
        <SelectItem key={language.key} value={language.key}>
          {language.label}
        </SelectItem>
      ))}
    </Select>
  );
}
