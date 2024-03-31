"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { toast } from "../../../../../components/ui/use-toast";
import { MenuCategoryColumn } from "./MenuCategoryColumn";

interface CellsActionProps {
  data: MenuCategoryColumn;
}
const CellsAction = ({ data }: CellsActionProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ description: "Copied to clipboard", variant: "green" });
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/menuCategory/${id}`);
      toast({ description: "Deleted...", variant: "green" });
    } catch (error) {
      console.log(error);
      toast({ description: "Error Deleting", variant: "green" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-10 w-10 p-0">
          <span className="sr-only">Open</span>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4" />
          CopyId
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={loading}
          onClick={() => {
            router.push(`/admin/menuCategories/${data.id}`);
          }}
        >
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(data.id)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellsAction;
