import AppLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem, type Product, type Category } from '@/types';
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
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import ProductDialog from './ProductDialog';
import ConfirmDialog from '@/components/ui/confirm-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    { 
      title: 'Products',
      href: '/admin/products'
    },
];

export default function Index({ products, categories }: { products: Product[]; categories: Category[] }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const handleDeleteClick = (product: Product) => {
      setProductToDelete(product);
      setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
      if (!productToDelete) return;

      router.delete(`/admin/products/${productToDelete.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Product deleted successfully');
          setDeleteDialogOpen(false);
          setProductToDelete(null);
        },
        onError: () => {
          toast.error('Failed to delete product');
          setDeleteDialogOpen(false);
          setProductToDelete(null);
        },
      });
    };

    const handleDeleteCancel = () => {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    };

    const activeProducts = products.filter(product => product.is_active);
    const inactiveProducts = products.filter(product => !product.is_active);
    const lowStockProducts = products.filter(product => product.stock < 10);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
              <div className='flex items-center justify-between'>
                <Heading title="Products List" description="All products listed you can do multiple actions and view states" />
                <ProductDialog
                  trigger={<Button variant="outline">Add Product</Button>}
                  categories={categories}
                />
              </div>
              <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{products.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Active Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activeProducts.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Inactive Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{inactiveProducts.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Low Stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{lowStockProducts.length}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>
                          <div className='flex space-x-2'>
                            <div>
                              <img 
                                src={product.images.find(image => image.is_main).image} 
                                alt={product.name}
                                style={{ width: '80px', height: 'auto', borderRadius: '6px' }}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.slug}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category?.name || 'N/A'}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={product.stock < 10 ? 'text-orange-600 font-medium' : ''}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.is_active ? 'default' : 'secondary'}>
                            {product.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center space-x-2'>
                            <ProductDialog
                              trigger={<Button variant="ghost" size="sm">Edit</Button>}
                              product={product}
                              categories={categories}
                            />
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteClick(product)}
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
              description={`This action cannot be undone. This will permanently delete the product "${productToDelete?.name}" and remove it from our servers.`}
              confirmText="Delete Product"
              confirmVariant="destructive"
              onConfirm={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
            />
        </AppLayout>
    );
}
