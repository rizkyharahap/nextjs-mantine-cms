"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavLink, Stack, Title } from "@mantine/core";

import { menus } from "@/constants/menus";

import classes from "./Sidebar.module.css";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Stack gap="xl">
      {menus.map((item) => (
        <div key={item.header}>
          <Title order={6} className={classes.sectionTitle}>
            {item.header}
          </Title>

          {item.section.map((subItem) =>
            subItem.dropdownItems ? (
              <NavLink
                variant="subtle"
                key={subItem.name}
                label={subItem.name}
                childrenOffset={0}
                className={classes.sectionLink}
                active={pathname.startsWith(subItem.href)}
                leftSection={subItem.icon && <subItem.icon />}
              >
                {subItem.dropdownItems?.map((dropdownItem) => (
                  <NavLink
                    variant="subtle"
                    component={Link}
                    href={dropdownItem.href}
                    key={dropdownItem.name}
                    label={dropdownItem.name}
                    active={pathname === dropdownItem.href}
                    className={classes.sectionDropdownItemLink}
                    leftSection={<span className="dot" />}
                  />
                ))}
              </NavLink>
            ) : (
              <NavLink
                variant="subtle"
                component={Link}
                href={subItem.href}
                key={subItem.name}
                label={subItem.name}
                active={pathname === subItem.href}
                className={classes.sectionLink}
                leftSection={subItem.icon && <subItem.icon />}
              />
            ),
          )}
        </div>
      ))}
    </Stack>
  );
}
