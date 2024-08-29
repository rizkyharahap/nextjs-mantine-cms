"use client";

import { usePathname } from "next/navigation";

import { menus } from "@/constants/menus";
import { NavLink, Stack, Title } from "@mantine/core";

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
                active={pathname.includes(subItem.href)}
                leftSection={subItem.icon && <subItem.icon />}
              >
                {subItem.dropdownItems?.map((dropdownItem) => (
                  <NavLink
                    variant="subtle"
                    // component={RouterLink}
                    // to={dropdownItem.href}
                    key={dropdownItem.name}
                    label={dropdownItem.name}
                    active={pathname.includes(dropdownItem.href)}
                    className={classes.sectionDropdownItemLink}
                    leftSection={<span className="dot" />}
                  />
                ))}
              </NavLink>
            ) : (
              <NavLink
                variant="subtle"
                // component={RouterLink}
                // to={subItem.href}
                key={subItem.name}
                label={subItem.name}
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
