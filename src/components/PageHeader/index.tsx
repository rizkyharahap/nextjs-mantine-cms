import { type ReactNode } from "react";

import Link from "next/link";

import {
  Anchor,
  Breadcrumbs,
  type ElementProps,
  Group,
  type GroupProps,
  Text,
  Title,
} from "@mantine/core";

interface PageHeaderProps
  extends Omit<GroupProps, "title">,
    ElementProps<"header", keyof GroupProps> {
  title: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({
  children,
  title,
  breadcrumbs,
  className,
  mb = "xl",
  ...props
}: PageHeaderProps) {
  return (
    <Group
      component="header"
      justify="space-between"
      className={className}
      mb={mb}
      {...props}
    >
      <div>
        <Title component="h2" order={2}>
          {title}
        </Title>

        {breadcrumbs && (
          <Breadcrumbs mt="sm">
            {breadcrumbs.map((breadcrumb) =>
              breadcrumb.href ? (
                <Anchor
                  fz="sm"
                  underline="never"
                  c="blue"
                  component={Link}
                  key={breadcrumb.label}
                  href={breadcrumb.href}
                >
                  {breadcrumb.label}
                </Anchor>
              ) : (
                <Text key={breadcrumb.label} c="dimmed" fz="sm">
                  {breadcrumb.label}
                </Text>
              ),
            )}
          </Breadcrumbs>
        )}
      </div>

      {children}
    </Group>
  );
}
