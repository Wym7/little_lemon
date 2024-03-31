"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellsAction from "./CellsAction";

export type MenuCategoryColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<MenuCategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

  { id: "actions", cell: ({ row }) => <CellsAction data={row.original} /> },
];
