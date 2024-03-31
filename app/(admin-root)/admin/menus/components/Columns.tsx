"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellsAction from "./CellsAction";

export type MenuColumn = {
  id: string;
  name: string;
  createdAt: string;
  isArchived: boolean;
  isFeatured: boolean;
};

export const columns: ColumnDef<MenuColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isFeatured",
    header: "IsFeatured",
  },
  {
    accessorKey: "isArchived",
    header: "IsArchived",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

  { id: "actions", cell: ({ row }) => <CellsAction data={row.original} /> },
];
