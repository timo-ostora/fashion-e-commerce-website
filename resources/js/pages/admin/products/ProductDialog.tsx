import { useEffect, useState } from "react";
import { type Product, type Category } from "@/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, router } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { toast } from "sonner";

type ProductForm = {
  name?: string;
  slug?: string;
  price?: number;
  stock?: number;
  description?: string;
  category_id?: number;
  is_active?: boolean;
  images: [
    image: string,
    is_main: boolean
  ]
}

interface Props {
  trigger: React.ReactNode;
  product?: Product;
  categories?: Category[];
  onClose?: () => void;
}

export default function ProductDialog({ trigger, product, categories = [], onClose }: Props) {
  const isEdit = !!product;

  const productName = useRef<HTMLInputElement>(null)
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    description: product?.description ?? "",
    category_id: product?.category_id ?? undefined,
    is_active: product?.is_active ?? true,
    images: product?.images ?? []
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      reset();
      onClose?.();
    }
  }, [open]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!data.name?.trim() || !data.slug?.trim() || !data.category_id) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (data.price === undefined || data.price < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (data.stock === undefined || data.stock < 0) {
      toast.error("Please enter a valid stock quantity.");
      return;
    }

    const endpoint = isEdit
      ? `/admin/products/${product?.id}`
      : "/admin/products";

    const verb = isEdit ? "updated" : "created";
    
    if(isEdit) {
      router.patch(endpoint, data, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Product ${verb} successfully.`);
          setOpen(false);
          reset();
        },
        onError: (serverErrors) => {
          setData((prev) => ({ ...prev })); // trigger reactivity if needed
          Object.assign(errors, serverErrors); // update errors variable from useForm
          if (Object.keys(serverErrors).length > 0) {
            toast.error(`Failed to ${verb} product. Please check the highlighted fields.`);
          } else {
            toast.error(`Failed to ${verb} product. Please try again.`);
          }
        },
      });
      
    } else {
      router.post(endpoint, data, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Product ${verb} successfully.`);
          setOpen(false);
          reset();
        },
        onError: (serverErrors) => {
          setData((prev) => ({ ...prev })); // trigger reactivity if needed
          Object.assign(errors, serverErrors); // update errors variable from useForm
          if (Object.keys(serverErrors).length > 0) {
            toast.error(`Failed to ${verb} product. Please check the highlighted fields.`);
          } else {
            toast.error(`Failed to ${verb} product. Please try again.`);
          }
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent aria-describedby={isEdit ? "Edit product" : "Create product"} className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Create Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <div className="flex space-x-2">
        {data.images.map((img, index) => (
                <div key={index}>
                  <img src={img.image} alt="Preview" style={{ width: 80 }} />
                  <label>
                    <input
                      type="radio"
                      name="mainImage"
                      checked={img.is_main}
                      onChange={() => setImages(images.map((i, idx) => ({
                        ...i,
                        is_main: idx === index
                      })))}
                    />
                    Set as main
                  </label>
                </div>
        ))}
        </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
              <Input
                id="name"
                type="text"
                ref={productName}
                placeholder="Product name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              <InputError message={errors.name} className={errors.name ? 'block' : "hidden"} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
              <Input
                id="slug"
                type="text"
                placeholder="product-slug"
                value={data.slug}
                onChange={(e) => setData("slug", e.target.value)}
              />
              <InputError message={errors.slug} className={errors.slug ? 'block' : "hidden"} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price <span className="text-destructive">*</span></Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={data.price}
                onChange={(e) => setData("price", parseFloat(e.target.value) || 0)}
              />
              <InputError message={errors.price} className={errors.price ? 'block' : "hidden"} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock <span className="text-destructive">*</span></Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                value={data.stock}
                onChange={(e) => setData("stock", parseInt(e.target.value) || 0)}
              />
              <InputError message={errors.stock} className={errors.stock ? 'block' : "hidden"} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
            <Select value={data.category_id?.toString()} onValueChange={(value) => setData("category_id", parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputError message={errors.category_id} className={errors.category_id ? 'block' : "hidden"} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
            <textarea
              id="description"
              placeholder="Product description"
              value={data.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData("description", e.target.value)}
              rows={3}
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <InputError message={errors.description} className={errors.description ? 'block' : "hidden"} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={data.is_active}
              onCheckedChange={(checked: boolean) => setData("is_active", checked)}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={processing}>
              {isEdit ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
