import { zodResolver } from "@hookform/resolvers/zod";
import { MenuCategory } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import z from "zod";
import { Button } from "../../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";

interface MenuCategoryProps {
  initialData?: MenuCategory[];
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

type MenuCategoryFormValues = z.infer<typeof formSchema>;

const MenuCategoryForm = ({ initialData }: MenuCategoryProps) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const updateMenuCategoryData = initialData?.map((item) => item)[0];
  /* TODO:have to do with menu update */
  const form = useForm<MenuCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: updateMenuCategoryData?.name || "",
    },
  });
  const { reset } = form;

  async function onSubmit(values: MenuCategoryFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/menuCategory/${params.menuCategoryId}`, values);
        toast.success("MenuCategory updated");
        router.refresh();
        router.push("/admin/menuCategories");
        reset();
      } else {
        await axios.post("/api/menuCategory", values);
        toast.success("MenuCategory created");
        router.refresh();
        router.push("/admin/menuCategories");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-10 mt-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MenuCategory name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="MenuCategory"
                    className="w-80"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="w-fit">
            {initialData ? "Edit" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MenuCategoryForm;
