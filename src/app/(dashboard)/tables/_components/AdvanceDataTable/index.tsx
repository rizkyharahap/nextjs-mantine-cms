"use client";

import { useMemo } from "react";

import { Badge, MultiSelect, Radio, Stack, TextInput } from "@mantine/core";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  DataTable,
  DataTableContainer,
  DataTableContent,
  DataTableFilters,
  DataTableTabs,
  DataTableTitle,
  useDataTable,
  usePagination,
} from "@/components/DataTable";
import { ExportButton } from "@/components/ExportButton";
import { getCompanies } from "@/services/company";

export default function AdvanceDataTable() {
  const { page, limit, setLimit, setPage } = usePagination({
    page: 1,
    limit: 10,
  });

  const { tabs, filters, order } = useDataTable({
    orderConfig: { order: "asc", orderBy: "name" },

    tabsConfig: {
      tabs: [
        { value: "all", label: "All", counter: 10 },
        { value: "pending", label: "Pending", color: "orange", counter: 10 },
        {
          value: "cancelled",
          label: "Cancelled",
          color: "gray",
          disabled: true,
        },
        { value: "deleted", label: "Deleted", counter: 0, color: "red" },
      ],
    },
  });

  const { data, isPending, isFetching } = useQuery({
    queryKey: ["getCompanies", page, limit],
    queryFn: async () => await getCompanies({ page, limit }),
    placeholderData: keepPreviousData,
  });

  const totalRecords = data?.meta.total ?? 0;
  // const records = data?.data?.toSorted((prev, next)=>prev.name. ) ?? [];

  const records = useMemo(() => {
    const result = data?.data ?? [];

    result.sort((prev, next) => {
      if (prev[order.orderBy] < next[order.orderBy]) {
        return -1;
      }

      if (prev[order.orderBy] > next[order.orderBy]) {
        return 1;
      }
      return 0;
    });

    if (order.order === "desc") {
      result.reverse();
    }

    return result;
  }, [data?.data, order.order, order.orderBy]);

  const uniqueStatesOptions = Array.from(
    new Set(records.map((company) => company.state)),
  );

  return (
    <DataTableContainer>
      <DataTableTitle
        title="Richest companies"
        description="Top 10 richest companies in USA"
        actions={
          <ExportButton variant="default" size="xs">
            Export
          </ExportButton>
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
          fetching={isPending || isFetching}
          onPageChange={setPage}
          recordsPerPage={limit}
          totalRecords={totalRecords}
          onRecordsPerPageChange={setLimit}
          recordsPerPageOptions={[5, 10, 30]}
          columns={[
            {
              accessor: "name",
              sortable: true,
              filtering: Boolean(filters.filters.name),
              filter: (
                <TextInput
                  placeholder="Search by name"
                  value={(filters.filters.name?.value as string) ?? ""}
                  onChange={(e) =>
                    filters.change({
                      name: "name",
                      label: "Name",
                      value: e.currentTarget.value,
                    })
                  }
                />
              ),
            },
            { accessor: "address" },
            { accessor: "city" },
            {
              accessor: "state",
              filtering: Boolean(filters.filters.state),
              filter: (
                <MultiSelect
                  w="10rem"
                  data={uniqueStatesOptions}
                  value={filters.filters.state?.value as string[]}
                  onChange={(value) =>
                    filters.change({
                      name: "state",
                      label: "States",
                      value,
                    })
                  }
                />
              ),
            },
            {
              accessor: "active",
              width: 120,
              filtering: Boolean(filters.filters.active),
              filter: (
                <Radio.Group
                  value={filters.filters.active?.value ? "true" : "false"}
                  onChange={(value) =>
                    filters.change({
                      name: "active",
                      label: "Active",
                      value: value === "true",
                      valueLabel: value === "true" ? "Active" : "Inactive",
                    })
                  }
                >
                  <Stack>
                    <Radio value="true" label="Active" />
                    <Radio value="false" label="Inactive" />
                  </Stack>
                </Radio.Group>
              ),
              render: (company) => (
                <Badge
                  w="100%"
                  size="sm"
                  variant="outline"
                  color={company.active ? "teal" : "red"}
                >
                  {company.active ? "Active" : "Inactive"}
                </Badge>
              ),
            },
          ]}
          sortStatus={order.status}
          onSortStatusChange={order.change}
        />
      </DataTableContent>
    </DataTableContainer>
  );
}
