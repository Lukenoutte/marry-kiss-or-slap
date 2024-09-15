import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import { gradient } from "@/src/components/primitives";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { GithubIcon } from "@/src/components/icons";

import LocalSwitch from "./local-switch";

export const Navbar = ({
  hideLocalSwitch = false,
}: {
  hideLocalSwitch?: boolean;
}) => {
  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit hidden lg:block">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className={gradient({ color: "blue", size: "sm" })}>
              Marry, Kiss or
              <span
                className={`${gradient({ color: "pink", size: "sm" })} ml-2`}
              >
                Slap
              </span>
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarContent>
      {!hideLocalSwitch && <LocalSwitch />}
    </NextUINavbar>
  );
};
