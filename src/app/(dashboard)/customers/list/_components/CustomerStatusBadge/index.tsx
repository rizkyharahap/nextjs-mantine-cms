import { Badge, type BadgeProps } from "@mantine/core";

import { match } from "@/utilities/match";

interface CustomerStatusBadgeProps
  extends Omit<BadgeProps, "children" | "color"> {
  status: string;
}

export function CustomerStatusBadge({
  status,
  variant = "outline",
  ...props
}: CustomerStatusBadgeProps) {
  const color = match(
    [status === "active", "teal"],
    [status === "banned", "orange"],
    [status === "archived", "red"],
    [true, "gray"],
  );

  return (
    <Badge color={color} variant={variant} display="inline-flex" {...props}>
      {status}
    </Badge>
  );
}
