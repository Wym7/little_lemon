"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { MenuColumn } from "./Columns";

interface CellsActionProps {
  data: MenuColumn;
}
const CellsAction = ({ data }: CellsActionProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copied to clipboard");
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/menu/${id}`);
      toast.success("Menu Deleted!");
    } catch (error) {
      console.log(error);
      toast.success("Error Deleting");
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
            router.push(`/admin/menus/${data.id}`);
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
