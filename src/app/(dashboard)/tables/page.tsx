import { Stack, Title } from "@mantine/core";

import { PageHeader } from "@/components/PageHeader";
import { routes } from "@/constants/routes";

import AdvanceDataTable from "./_components/AdvanceDataTable";
import { SimpleTable } from "./_components/SimpleTable";

const breadcrumbs = [
  { label: "Dashboard", href: routes.dashboard.root },
  { label: "Tables" },
];

export default function TablesPage() {
  return (
    <>
      <PageHeader title="Tables" breadcrumbs={breadcrumbs} />

      <Stack gap="xl">
        <Stack>
          <Title order={4}>Simple Table</Title>

          <SimpleTable />
        </Stack>

        <Stack>
          <Title order={4}>Advanced Data table</Title>

          <AdvanceDataTable />
        </Stack>
      </Stack>
    </>
  );
}
