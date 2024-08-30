import { Stack } from "@mantine/core";

import { PageHeader } from "@/components/PageHeader";
import { routes } from "@/constants/routes";

import { CustomerMetrics } from "./_components/CustomerMetrics";
import { CustomersTable } from "./_components/CustomerTable";

const breadcrumbs = [
  { label: "Dashboard", href: routes.dashboard.root },
  { label: "Customers" },
  { label: "List" },
];

export default function CustomersListPage() {
  return (
    <>
      <PageHeader title="List customers" breadcrumbs={breadcrumbs} />
      <Stack>
        <CustomerMetrics />

        <CustomersTable />
      </Stack>
    </>
  );
}
