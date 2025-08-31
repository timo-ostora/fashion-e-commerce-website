import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem , type Category } from '@/types';
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
import CategoryDialog from './CategoryDialog';
import ConfirmDialog from '@/components/ui/confirm-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    { 
      title: 'Categories',
      href: '/admin/categories'
    },
];

export default function Index({ categories}: { categories: Category[] }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const handleDeleteClick = (category: Category) => {
      setCategoryToDelete(category);
      setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
      if (!categoryToDelete) return;

      router.delete(`/admin/categories/${categoryToDelete.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Category deleted successfully');
          setDeleteDialogOpen(false);
          setCategoryToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete category');
          setDeleteDialogOpen(false);
          setCategoryToDelete(null);
        },
      });
    };

    const handleDeleteCancel = () => {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories " />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
              <div className='flex items-center justify-between'>
                <Heading title="Categiries List" description="All categories listed you can do multiple actions and view states" />
                <CategoryDialog
                  trigger={<Button variant="outline">Add Category</Button>}
                />
              </div>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{categories.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Verified Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {categories.filter(category => category.name !== 'not').length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Not Verefied Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {categories.filter(category => category.name == 'not').length}
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
                      <TableHead>Slug</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.slug}</TableCell>
                        <TableCell>
                          <div className='flex items-center space-x-2'>
                            
                            <CategoryDialog
                              trigger={<Button variant="ghost" size="sm">Edit</Button>}
                              category={category}
                            />
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteClick(category)}
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
              description={`This action cannot be undone. This will permanently delete the category "${categoryToDelete?.name}" and remove it from our servers.`}
              confirmText="Delete Category"
              confirmVariant="destructive"
              onConfirm={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
            />
        </AppLayout>
    );
}
