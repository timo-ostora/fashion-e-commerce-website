import { useEffect, useState } from "react";
import { type User } from "@/types";
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
import { useForm , router} from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { toast } from "sonner";

type UserForm = {
  name: string;
  email: string;
  password: string | null;
  role: string;
}

interface Props {
  trigger: React.ReactNode;
  user?: User;
  onClose?: () => void;
}

export default function UserDialog({ trigger, user, onClose }: Props) {
  const isEdit = !!user;

  const userName = useRef<HTMLInputElement>(null)
  const { data, setData, processing, errors, reset } = useForm<UserForm>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    role: user?.role ?? ""
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
    if (!data.name?.trim() || !data.email?.trim() ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    

    const endpoint = isEdit
      ? `/admin/users/${user?.id}`
      : "/admin/users";

    const verb = isEdit ? "updated" : "created";
    if(isEdit) {

      router.patch(endpoint, data, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`user ${verb} successfully.`);
          setOpen(false);
          reset();
        },
        onError: (serverErrors) => {
          setData((prev) => ({ ...prev })); // trigger reactivity if needed
          Object.assign(errors, serverErrors); // update errors variable from useForm
          if (Object.keys(serverErrors).length > 0) {
            toast.error(`Failed to ${verb} user. Please check the highlighted fields.`);
          } else {
            toast.error(`Failed to ${verb} user. Please try again.`);
          }
        },
      });
      
    } else {
      router.post(endpoint, data, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`user ${verb} successfully.`);
          setOpen(false);
          reset();
        },
        onError: (serverErrors) => {
          setData((prev) => ({ ...prev })); // trigger reactivity if needed
          Object.assign(errors, serverErrors); // update errors variable from useForm
          if (Object.keys(serverErrors).length > 0) {
            toast.error(`Failed to ${verb} user. Please check the highlighted fields.`);
          } else {
            toast.error(`Failed to ${verb} user. Please try again.`);
          }
        },
      });
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent aria-describedby={isEdit ? "Edit user" : "Create user"}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit user" : "Create user"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-4 py-2">
            <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
            <Input
              id="name"
              type="text"
              ref={userName}
              placeholder="user name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            <InputError message={errors.name} className={errors.name ? 'block' : "hidden"} />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="user email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            <InputError message={errors.email} className={errors.email ? 'block' : "hidden"} />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="password">Password <span className={isEdit ? "hidden" : "text-destructive"}>*</span></Label>
            <Input
              id="password"
              type="password"
              placeholder={isEdit ? 'Leave blank to keep current password' : 'user password'}
              onChange={(e) => setData("password", e.target.value)}
            />
            <InputError message={errors.password} className={errors.password ? 'block' : "hidden"} />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="role">Role <span className="text-destructive">*</span></Label>
            <Select value={data.role} onValueChange={(value) => setData("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <InputError message={errors.role} className={errors.role ? 'block' : "hidden"} />
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