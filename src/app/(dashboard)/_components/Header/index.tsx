import Link from "next/link";

import { Logo } from "@/components/logo";
import { StickyHeader } from "@/components/StickyHeader";
import { Group } from "@mantine/core";

import { CurrentUser } from "./CurrentUser";
import classes from "./Header.module.css";
import { SidebarButton } from "./SidebarButton";

export function Header() {
  return (
    <StickyHeader className={classes.root}>
      <div className={classes.rightContent}>
        <SidebarButton />
        <Link href="/" className={classes.logo}>
          <Logo />
        </Link>
      </div>

      <Group>
        <CurrentUser />
      </Group>
    </StickyHeader>
  );
}
