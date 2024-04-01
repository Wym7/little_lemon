"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAppSelector } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu, MenuCategoryMenu } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { z } from "zod";
import ImageUpload from "../../../../../components/ui/image-upload";
import { toast } from "../../../../../components/ui/use-toast";

interface MenuProps {
  initialData?: Menu[] | null;
  menuCategoryIds?: MenuCategoryMenu[];
}
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "name must be at least 10 characters.",
  }),
  price: z.string().min(1),
  menuCategories: z
    .object({ id: z.string(), value: z.string(), label: z.string() })
    .array(),
  imageUrl: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type MenuFormValues = z.infer<typeof formSchema>;

const MenuForm = ({ initialData, menuCategoryIds }: MenuProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedMenuCategories, setSelectedMenuCategories] = useState([]);
  const updateMenuData = initialData?.map((item) => item)[0];

  const storeMenuCategories = useAppSelector(
    (state) => state.menuCategory.items
  );

  const menuCategories = storeMenuCategories.map((item) => ({
    value: item.name,
    label: item.name,
    id: item.id,
  }));
  console.log(menuCategoryIds, "menuCategoryIds");

  const allCategoryIds =
    menuCategoryIds && menuCategoryIds?.map((item) => item.menuCategoryId);

  const validMenuCategories = menuCategories.filter((item) =>
    allCategoryIds?.includes(item.id)
  );

  const animatedComponents = makeAnimated();

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: updateMenuData?.name ?? "",
      price: String(updateMenuData?.price) ?? "",
      description: updateMenuData?.description ?? "",
      imageUrl: updateMenuData?.imageUrl ?? "",
      menuCategories: validMenuCategories ?? [],
      isFeatured: updateMenuData?.isFeatured ?? false,
      isArchived: updateMenuData?.isArchived ?? false,
    },
  });

  const { reset } = form;

  async function onSubmit(values: MenuFormValues) {
    try {
      setLoading(true);

      if (initialData) {
        const menuCategoryIds = selectedMenuCategories.map(
          (category: { id: string }) => category.id
        );

        const addIds = {
          ...values,
          menuCategories: menuCategoryIds,
        };

        await axios.patch(`/api/menu/${params.menuId}`, addIds);
        toast({ title: "Menu updated" });
        router.refresh();
        router.push("/admin/menus");
      } else {
        const menuCategoryIds = selectedMenuCategories.map(
          (category: { id: string }) => category.id
        );

        const addIds = {
          ...values,
          menuCategories: menuCategoryIds,
        };
        const response = await axios.post("/api/menu", addIds);
        if (response.statusText === "OK") {
          toast({ title: "Menu created" });
          router.refresh();
          router.push("/admin/menus");
        }
      }
    } catch (error) {
      toast({ title: "Something went wrong" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-20 mt-10">
            <div className="w-96 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Menu"
                        className="w-full"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu Price</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full "
                        disabled={loading}
                        type="number"
                        placeholder="9.99"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-96  flex gap-5 flex-col">
              <FormLabel>Category</FormLabel>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={menuCategories as any}
                className="text-sm text-black"
                defaultValue={validMenuCategories && validMenuCategories}
                onChange={(selectedOptions) => {
                  const copiedOptions = [...selectedOptions];
                  setSelectedMenuCategories(copiedOptions as unknown as []);
                }}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={loading}
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured</FormLabel>
                    <FormDescription>
                      Choose as this week&apos;s Specials. This will appear at
                      the home page.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Archived</FormLabel>
                    <FormDescription>
                      This menu will not appear any where.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-3 items-start justify-start flex-col">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        disabled={loading}
                        value={field.value ? [field.value] : []}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-[200px] ">
                {initialData ? "Edit" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MenuForm;
