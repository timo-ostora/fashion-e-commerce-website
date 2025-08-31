import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem , type User } from '@/types';
import { Head , router} from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import UserDialog from './UserDialog';
import { useState } from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    { 
      title: 'users',
      href: '/admin/users'
    },
];
import ConfirmDialog from '@/components/ui/confirm-dialog';

export default function Index({ users }: { users: User[] }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDeleteClick = (User: User) => {
    setUserToDelete(User);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!userToDelete) return;

    router.delete(`/admin/users/${userToDelete.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('User deleted successfully');
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      },
      onError: () => {
        toast.error('Failed to delete User');
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      },
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
              <div className='flex items-center justify-between'>
                  <Heading title="Users List" description="All Users listed you can do multiple actions and view states" />
                  <UserDialog
                    trigger={<Button variant="outline">Add User</Button>}
                  />
              </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{users.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Verified Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {users.filter(user => user.email_verified_at).length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Not Verefied Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {users.filter(user => !user.email_verified_at).length}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.email_verified_at ? 'default' : 'secondary'}>
                              {user.email_verified_at ? 'Verified' : "Not Verified"}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                          <div className='flex items-center space-x-2'>
                            <UserDialog
                              trigger={<Button variant="ghost" size="sm">Edit</Button>}
                              user={user}
                              />
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteClick(user)}
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
              description={`This action cannot be undone. This will permanently delete the User "${userToDelete?.name}" and remove it from our servers.`}
              confirmText="Delete User"
              confirmVariant="destructive"
              onConfirm={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
            />
        </AppLayout>
    );
}
