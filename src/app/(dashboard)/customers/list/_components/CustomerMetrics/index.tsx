"use client";

import { Group, Loader, SimpleGrid } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import {
  PiArchiveDuotone,
  PiProhibitDuotone,
  PiPulseDuotone,
  PiUsersDuotone,
} from "react-icons/pi";

import {
  MetricCardIcon,
  MetricCardRoot,
  MetricCardTextEmphasis,
  MetricCardTextMuted,
} from "@/components/MetricCard";
import { getCustomerMetrics } from "@/services/customer";
import { formatInt } from "@/utilities/number";

export function CustomerMetrics() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: getCustomerMetrics,
  });

  const cards = [
    {
      icon: PiUsersDuotone,
      title: "Total customers",
      value: metrics?.total,
      color: "blue",
    },
    {
      icon: PiPulseDuotone,
      title: "Active customers",
      value: metrics?.banned,
      color: "teal",
    },
    {
      icon: PiProhibitDuotone,
      title: "Banned customers",
      value: metrics?.banned,
      color: "orange",
    },
    {
      icon: PiArchiveDuotone,
      title: "Archived customers",
      value: metrics?.banned,
      color: "red",
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, xl: 3, "2xl": 4 }}>
      {cards.map((card) => (
        <MetricCardRoot key={card.title}>
          <Group>
            <MetricCardIcon c={card.color}>
              <card.icon size="2rem" />
            </MetricCardIcon>
            <div>
              <MetricCardTextMuted>{card.title}</MetricCardTextMuted>
              <MetricCardTextEmphasis>
                {isLoading ? (
                  <Loader size="sm" color={card.color} />
                ) : (
                  formatInt(card.value ?? 0)
                )}
              </MetricCardTextEmphasis>
            </div>
          </Group>
        </MetricCardRoot>
      ))}
    </SimpleGrid>
  );
}
