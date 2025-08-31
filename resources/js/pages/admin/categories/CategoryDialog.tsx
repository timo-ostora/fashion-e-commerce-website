import { useEffect, useState } from "react";
import { type Category } from "@/types";
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
import { useForm , router} from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { toast } from "sonner";
import { type Category  as Cat} from "@/types";

type CategoryForm = {
  name ?: string;
  slug ?: string;
}

interface Props {
  trigger: React.ReactNode;
  category?: Cat;
  onClose?: () => void;
}

export default function CategoryDialog({ trigger, category, onClose }: Props) {
  const isEdit = !!category;

  const categoryName = useRef<HTMLInputElement>(null)
  const { data, setData, post, put, processing, errors, reset } = useForm<CategoryForm>({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
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
    if (!data.name?.trim() || !data.slug?.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const endpoint = isEdit
      ? `/admin/categories/${category?.id}`
      : "/admin/categories";

    const verb = isEdit ? "updated" : "created";
    if(isEdit) {

      router.patch(endpoint, data, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Category ${verb} successfully.`);
          setOpen(false);
          reset();
        },
        onError: (serverErrors) => {
          setData((prev) => ({ ...prev })); // trigger reactivity if needed
          Object.assign(errors, serverErrors); // update errors variable from useForm
          if (Object.keys(serverErrors).length > 0) {
            toast.error(`Failed to ${verb} category. Please check the highlighted fields.`);
          } else {
            toast.error(`Failed to ${verb} category. Please try again.`);
          }
        },
      });
      
    } else {
      router.post(endpoint, data, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Category ${verb} successfully.`);
          setOpen(false);
          reset();
        },
        onError: (serverErrors) => {
          setData((prev) => ({ ...prev })); // trigger reactivity if needed
          Object.assign(errors, serverErrors); // update errors variable from useForm
          if (Object.keys(serverErrors).length > 0) {
            toast.error(`Failed to ${verb} category. Please check the highlighted fields.`);
          } else {
            toast.error(`Failed to ${verb} category. Please try again.`);
          }
        },
      });
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent aria-describedby={isEdit ? "Edit category" : "Create category"}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit category" : "Create category"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-4 py-2">
            <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
            <Input
              id="name"
              type="text"
              ref={categoryName}
              placeholder="category name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            <InputError message={errors.name} className={errors.name ? 'block' : "hidden"} />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="slug">Slug <span className="text-destructive">*</span></Label>
            <Input
              id="slug"
              type="text"
              placeholder="category Slug"
              value={data.slug}
              onChange={(e) => setData("slug", e.target.value)}
            />
            <InputError message={errors.slug} className={errors.slug ? 'block' : "hidden"} />
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