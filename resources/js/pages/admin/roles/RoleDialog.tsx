import { useEffect, useState } from "react";
import { type Role } from "@/types";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm , router} from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { toast } from "sonner";
import { type  Role as R} from "@/types";

type RoleForm = {
  name?: string;
  permissions: string[];
}

interface Props {
  trigger: React.ReactNode;
  role?: R;
  permissions: string[];
  onClose?: () => void;
}

export default function RoleDialog({ trigger, role, permissions, onClose }: Props) {
  const isEdit = !!role;

  const roleName = useRef<HTMLInputElement>(null)
  const { data, setData, post, put, processing, errors, reset } = useForm<RoleForm>({
    name: role?.name ?? "",
    permissions: role?.permissions?.map(p => p.name) ?? [],
  });

  // Debug: Log the current permissions for the role
  useEffect(() => {
    if (role && isEdit) {
      console.log('Role permissions:', role.permissions?.map(p => p.name));
      console.log('Form permissions:', data.permissions);
    }
  }, [role, isEdit, data.permissions]);
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
    if (!data.name?.trim() ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const endpoint = isEdit
      ? `/admin/roles/${role?.id}`
      : "/admin/roles";

    const verb = isEdit ? "updated" : "created";
    if(isEdit) {

      router.patch(endpoint, data, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Role ${verb} successfully.`);
          setOpen(false);
          reset();
        },
        onError: (serverErrors) => {
          setData((prev) => ({ ...prev })); // trigger reactivity if needed
          Object.assign(errors, serverErrors); // update errors variable from useForm
          if (Object.keys(serverErrors).length > 0) {
            toast.error(`Failed to ${verb} role. Please check the highlighted fields.`);
          } else {
            toast.error(`Failed to ${verb} role. Please try again.`);
          }
        },
      });
      
    } else {
      router.post(endpoint, data, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Role ${verb} successfully.`);
          setOpen(false);
          reset();
        },
        onError: (serverErrors) => {
          setData((prev) => ({ ...prev })); // trigger reactivity if needed
          Object.assign(errors, serverErrors); // update errors variable from useForm
          if (Object.keys(serverErrors).length > 0) {
            toast.error(`Failed to ${verb} role. Please check the highlighted fields.`);
          } else {
            toast.error(`Failed to ${verb} role. Please try again.`);
          }
        },
      });
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent aria-describedby={isEdit ? "Edit role" : "Create role"}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit role" : "Create role"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-4 py-2">
            <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
            <Input
              id="name"
              type="text"
              ref={roleName}
              placeholder="role name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            <InputError message={errors.name} className={errors.name ? 'block' : "hidden"} />
          </div>

          <div className="grid gap-4">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-3">
                             {permissions.map((permission: string) => {
                 const isChecked = data.permissions.includes(permission);
                 return (
                   <div key={permission} className="flex items-center space-x-2">
                     <Checkbox
                       id={permission}
                       checked={isChecked}
                       onCheckedChange={(checked) => {
                         if (checked) {
                           setData("permissions", [...data.permissions, permission]);
                         } else {
                           setData("permissions", data.permissions.filter(p => p !== permission));
                         }
                       }}
                     />
                     <Label 
                       htmlFor={permission} 
                       className={`text-sm font-normal capitalize ${
                         isChecked ? 'text-primary font-medium' : 'text-muted-foreground'
                       }`}
                     >
                       {permission}
                     </Label>
                   </div>
                 );
               })}
            </div>
            <InputError message={errors.permissions} className={errors.permissions ? 'block' : "hidden"} />
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