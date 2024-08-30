import { Flex, Text } from "@mantine/core";

import { PiTrendDown, PiTrendUp } from "react-icons/pi";

import { match } from "@/utilities/match";
import { formatPercentage } from "@/utilities/number";

import {
  MetricCardTextMuted,
  type MetricCardTextMutedProps,
} from "./MetricCardTextMuted";

interface MetricCardTextTrendProps extends MetricCardTextMutedProps {
  value: number;
}

export function MetricCardTextTrend({
  value,
  children,
  ...props
}: MetricCardTextTrendProps) {
  const {
    sign,
    color,
    icon: Icon,
  } = match(
    [
      value > 0,
      { sign: "+", color: "var(--mantine-color-teal-6)", icon: PiTrendUp },
    ],
    [
      value > 0,
      { sign: "", color: "var(--mantine-color-red-6)", icon: PiTrendDown },
    ],
  );

  return (
    <MetricCardTextMuted style={{ textWrap: "nowrap" }} {...props}>
      <Flex align="center">
        <Icon color={color} size="1rem" />
        <Text component="span" fz="inherit" c={color} mx="0.25rem">
          {formatPercentage(value, { prefix: sign })}
        </Text>
        {children}
      </Flex>
    </MetricCardTextMuted>
  );
}
