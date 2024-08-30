"use client";

import { Group, Table } from "@mantine/core";

import { AddButton } from "@/components/Button";
import { ExportButton } from "@/components/ExportButton";
import { TableContainer } from "@/components/TableContainer";

const data = [
  {
    id: 1,
    number: 6,
    name: "Carbon",
    symbol: "C",
    mass: "12.011",
  },
  {
    id: 2,
    number: 7,
    name: "Nitrogen",
    symbol: "N",
    mass: "14.007",
  },
  {
    id: 3,
    number: 39,
    name: "Yttrium",
    symbol: "Y",
    mass: "88.906",
  },
  {
    id: 4,
    number: 56,
    name: "Barium",
    symbol: "Ba",
    mass: "137.33",
  },
  {
    id: 5,
    number: 58,
    name: "Cerium",
    symbol: "Ce",
    mass: "140.12",
  },
];

export function SimpleTable() {
  return (
    <TableContainer
      title="Common atoms"
      description="Some random atomic elements."
      actions={
        <Group>
          <AddButton variant="default" size="xs">
            Add
          </AddButton>
          <ExportButton variant="default" size="xs">
            Export
          </ExportButton>
        </Group>
      }
    >
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Atomic number</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td>{row.number}</Table.Td>
              <Table.Td>{row.name}</Table.Td>
              <Table.Td>{row.symbol}</Table.Td>
              <Table.Td>{row.mass}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </TableContainer>
  );
}
