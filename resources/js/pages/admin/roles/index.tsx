import AppLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem , type Role, type Permission } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Heading  from '@/components/heading';
import RoleDialog from './RoleDialog';
import ConfirmDialog from '@/components/ui/confirm-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    { 
      title: 'Roles',
      href: '/admin/Roles'
    },
];

export default function Index({ roles, permissions }: { roles: Role[], permissions: string[] }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

    const handleDeleteClick = (role: Role) => {
      setRoleToDelete(role);
      setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
      if (!roleToDelete) return;

      router.delete(`/admin/roles/${roleToDelete.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Role deleted successfully');
          setDeleteDialogOpen(false);
          setRoleToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete role');
          setDeleteDialogOpen(false);
          setRoleToDelete(null);
        },
      });
    };

    const handleDeleteCancel = () => {
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles " />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
              <div className='flex items-center justify-between'>
                <Heading title="Roles List" description="All roles listed you can do multiple actions and view states" />
                <RoleDialog
                  permissions={permissions}
                  trigger={<Button variant="outline">Add Role</Button>}
                />
              </div>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Roles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{roles.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Verified Roles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {roles.filter(role => role.name !== 'not').length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Not Verified Roles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {roles.filter(role => role.name == 'not').length}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead>Id</TableHead>
                       <TableHead>Name</TableHead>
                       <TableHead>Permissions</TableHead>
                       <TableHead>Users Count</TableHead>
                       <TableHead>Actions</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {roles.map((role) => (
                       <TableRow key={role.id}>
                         <TableCell className="font-medium">{role.id}</TableCell>
                         <TableCell>
                           <div className="flex flex-col">
                             <span className="font-medium">{role.name}</span>
                             <span className="text-sm text-muted-foreground">{role.slug}</span>
                           </div>
                         </TableCell>
                         <TableCell>
                           <div className="flex flex-wrap gap-1">
                             {role.permissions && role.permissions.length > 0 ? (
                               role.permissions.map((permission: Permission) => (
                                 <span
                                   key={permission.id}
                                   className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                                 >
                                   {permission.name}
                                 </span>
                               ))
                             ) : (
                               <span className="text-sm text-muted-foreground">No permissions</span>
                             )}
                           </div>
                         </TableCell>
                         <TableCell>
                           <span className="text-sm text-muted-foreground">
                             {role.users_count || 0} users
                           </span>
                         </TableCell>
                         <TableCell>
                           <div className='flex items-center space-x-2'>
                             <RoleDialog
                               trigger={<Button variant="ghost" size="sm">Edit</Button>}
                               role={role}
                               permissions={permissions}
                             />
                             <Button 
                               variant="destructive" 
                               size="sm" 
                               onClick={() => handleDeleteClick(role)}
                               disabled={role.name === 'admin' || role.name === 'user'}
                             >
                               Delete
                             </Button>
                           </div>
                         </TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
              </div>
            </div>
            
            <ConfirmDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              title="Are you absolutely sure?"
              description={`This action cannot be undone. This will permanently delete the role "${roleToDelete?.name}" and remove it from our servers.`}
              confirmText="Delete Role"
              confirmVariant="destructive"
              onConfirm={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
            />
        </AppLayout>
    );
}
