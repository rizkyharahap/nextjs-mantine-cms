"use client";

import { useMemo } from "react";

import { Avatar, Box, Group, Loader, Rating, Text } from "@mantine/core";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { AddButton } from "@/components/Button";
import {
  DataTable,
  DataTableActions,
  DataTableContainer,
  DataTableContent,
  DataTableFilters,
  DataTableTabs,
  DataTableTitle,
  useDataTable,
  usePagination,
} from "@/components/DataTable";
import { getCustomerMetrics, getCustomers } from "@/services/customer";
import { formatDate } from "@/utilities/date";
import { firstLetters } from "@/utilities/text";

import { CustomerStatusBadge } from "../CustomerStatusBadge";

type OrderFields = any;

export function CustomersTable() {
  const { data: metrics } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: getCustomerMetrics,
  });

  const { page, limit, setLimit, setPage } = usePagination({
    page: 1,
    limit: 10,
  });

  const { tabs, filters, order } = useDataTable<OrderFields>({
    orderConfig: {
      order: "asc",
      orderBy: "fullName",
    },
    tabsConfig: {
      tabs: [
        {
          value: "*",
          label: "All",
          counter: metrics?.total,
          rightSection: <Loader size="xs" />,
        },
        {
          value: "active",
          label: "Active",
          color: "teal",
          counter: metrics?.active,
          rightSection: <Loader size="xs" color="teal" />,
        },
        {
          value: "banned",
          label: "Banned",
          color: "orange",
          counter: metrics?.banned,
          rightSection: <Loader size="xs" color="teal" />,
        },
        {
          value: "archived",
          label: "Archived",
          color: "red",
          counter: metrics?.archived,
          rightSection: <Loader size="xs" color="teal" />,
        },
      ],
    },
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "getCustomers",
      page,
      limit,
      tabs.value,
      order.orderBy,
      order.order,
    ],
    queryFn: async () =>
      await getCustomers({
        page,
        limit,
        status: tabs.value,
        orderBy: order.orderBy,
        order: order.order,
      }),
    placeholderData: keepPreviousData,
  });

  const records = useMemo(() => {
    const result = data?.data ?? [];

    result.sort((prev, next) => {
      const orderBy = order.orderBy as keyof typeof prev;

      if (prev[orderBy] < next[orderBy]) {
        return -1;
      }

      if (prev[orderBy] > next[orderBy]) {
        return 1;
      }

      return 0;
    });

    if (order.order === "desc") {
      result.reverse();
    }

    return result;
  }, [data?.data, order.order, order.orderBy]);

  return (
    <DataTableContainer>
      <DataTableTitle
        title="Customers"
        description="List of all customers"
        actions={
          <AddButton variant="default" size="xs">
            Add new customer
          </AddButton>
        }
      />

      <DataTableTabs tabs={tabs.tabs} onChange={tabs.change} />

      <DataTableFilters filters={filters.filters} onClear={filters.clear} />

      <DataTableContent>
        <DataTable
          highlightOnHover
          minHeight={400}
          page={page}
          records={records}
          fetching={isLoading || isFetching}
          onPageChange={setPage}
          recordsPerPage={limit}
          totalRecords={data?.meta.total ?? 0}
          onRecordsPerPageChange={setLimit}
          recordsPerPageOptions={[5, 10, 30]}
          sortStatus={order.status}
          onSortStatusChange={order.change}
          columns={[
            {
              accessor: "number",
              title: "Customer n°",
              width: 156,
            },
            {
              accessor: "fullName",
              title: "Name",
              sortable: true,
              render: (customer) => (
                <Group wrap="nowrap">
                  <Avatar src={customer.avatarUrl} alt={customer.displayName}>
                    {firstLetters(customer.displayName)}
                  </Avatar>
                  <Box w="16rem">
                    <Text truncate="end">{customer.fullName}</Text>
                    <Text size="sm" c="dimmed" truncate="end">
                      {customer.email}
                    </Text>
                  </Box>
                </Group>
              ),
            },
            {
              accessor: "phoneNumber",
              title: "Phone number",
              noWrap: true,
              width: 180,
            },
            {
              accessor: "rating",
              title: "Rating",
              width: 160,
              sortable: true,
              render: (customer) => (
                <Rating value={customer.rating} fractions={2} readOnly />
              ),
            },
            {
              accessor: "status",
              title: "Status",
              width: 120,
              render: (customer) => (
                <CustomerStatusBadge status={customer.status} w="100%" />
              ),
            },
            {
              accessor: "createdAt",
              title: "Created at",
              noWrap: true,
              width: 140,
              sortable: true,
              render: (customer) => formatDate(customer.createdAt),
            },
            {
              accessor: "updatedAt",
              title: "Updated at",
              noWrap: true,
              width: 140,
              render: (customer) => formatDate(customer.updatedAt),
            },
            {
              accessor: "actions",
              title: "Actions",
              textAlign: "right",
              width: 100,
              render: () => (
                <DataTableActions
                  onView={console.warn}
                  onEdit={console.warn}
                  onDelete={console.warn}
                />
              ),
            },
          ]}
        />
      </DataTableContent>
    </DataTableContainer>
  );
}
