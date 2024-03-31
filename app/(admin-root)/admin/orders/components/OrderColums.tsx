"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  menus: string;
  name: string;
  address: string;
  createdAt: string;
  totalPrice: string;
  isPaid: boolean;
};

/* id,customer Id,address,total price,isPaid,created At ,*/

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "menus",
    header: "Menus",
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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
  {
    accessorKey: "isPaid",
    header: "IsPaid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
