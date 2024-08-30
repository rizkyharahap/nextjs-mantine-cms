"use client";

import { DataTable as MantineDataTable } from "mantine-datatable";

import { CardTitle } from "../CardTitle";
import { DataTableActions } from "./DataTableActions";
import { DataTableContainer } from "./DataTableContainer";
import { DataTableContent } from "./DataTableContent";
import { DataTableFilters } from "./DataTableFilters";
import { DataTableTabs } from "./DataTableTabs";
import { useDataTable } from "./useDataTable";
import { usePagination } from "./usePagination";

export const DataTable = {
  Title: CardTitle,
  Container: DataTableContainer,
  Content: DataTableContent,
  Tabs: DataTableTabs,
  Filters: DataTableFilters,
  Actions: DataTableActions,
  Table: MantineDataTable,
};

export { useDataTable, usePagination };
