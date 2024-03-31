"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CustomerColumn = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
];
