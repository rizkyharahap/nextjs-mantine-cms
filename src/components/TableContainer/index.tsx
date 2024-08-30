import { type ReactNode } from "react";

import { Card, type CardProps } from "@mantine/core";

import { CardTitle } from "../CardTitle";

interface TableContainerProps extends CardProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export function TableContainer({
  children,
  title,
  description,
  actions,
  ...props
}: TableContainerProps) {
  return (
    <Card {...props}>
      {title && (
        <CardTitle
          withBorder
          title={title}
          description={description}
          actions={actions}
        />
      )}
      <Card.Section>{children}</Card.Section>
    </Card>
  );
}
