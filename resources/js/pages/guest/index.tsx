import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, ShoppingBag, Truck, Shield, CreditCard, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

// Mock data for the landing page
const popularCategories = [
    { 
        name: 'Clothing', 
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center', 
        count: '500+ Items', 
        href: '/categories/clothing' 
    },
    { 
        name: 'Shoes', 
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center', 
        count: '200+ Items', 
        href: '/categories/shoes' 
    },
    { 
        name: 'Accessories', 
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop&crop=center', 
        count: '300+ Items', 
        href: '/categories/accessories' 
    },
    { 
        name: 'Sportswear', 
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center', 
        count: '150+ Items', 
        href: '/categories/sportswear' 
    },
];

const featuredProducts = [
    { 
        name: 'Premium Black Hoodie', 
        price: '$89.99', 
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop&crop=center', 
        rating: 4.8, 
        reviews: 127 
    },
    { 
        name: 'Urban Street Sneakers', 
        price: '$129.99', 
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=400&fit=crop&crop=center', 
        rating: 4.9, 
        reviews: 89 
    },
    { 
        name: 'Designer Denim Jacket', 
        price: '$199.99', 
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop&crop=center', 
        rating: 4.7, 
        reviews: 156 
    },
    { 
        name: 'Luxury Watch', 
        price: '$299.99', 
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=400&fit=crop&crop=center', 
        rating: 4.9, 
        reviews: 203 
    },
];

const testimonials = [
    { 
        name: 'Alex Johnson', 
        role: 'Fashion Designer', 
        content: 'The quality and style of Black shop is unmatched. Every piece feels premium and unique.', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face' 
    },
    { 
        name: 'Sarah Chen', 
        role: 'Style Influencer', 
        content: 'I love how Black shop combines urban aesthetics with luxury. Their pieces are conversation starters.', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face' 
    },
    { 
        name: 'Marcus Rodriguez', 
        role: 'Creative Director', 
        content: 'The attention to detail and craftsmanship is exceptional. This is what luxury streetwear should be.', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face' 
    },
];

const features = [
    { icon: ShoppingBag, title: 'Curated Collections', description: 'Handpicked pieces from the world\'s most innovative designers' },
    { icon: Truck, title: 'Free Shipping', description: 'Complimentary shipping on all orders over $150' },
    { icon: Shield, title: 'Quality Guarantee', description: '30-day return policy with premium customer support' },
    { icon: CreditCard, title: 'Secure Payment', description: 'Multiple payment options with bank-level security' },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Black shop - Luxury Urban Fashion" />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black overflow-hidden">
                <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-10"></div>
                <div className="absolute inset-0">
                    <PlaceholderPattern className="opacity-10 dark:opacity-5" />
                </div>
                <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
                    <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10">
                        Premium Urban Fashion
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Elevate Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 dark:from-white dark:to-gray-200">
                            Urban Style
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Discover the perfect blend of luxury and street culture. 
                        Curated collections that define modern urban sophistication.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="outline">
                            Shop Collection
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="default">
                            View Categories
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Black Shop</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Experience luxury urban fashion with unparalleled quality and service
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-800 dark:shadow-gray-900/50">
                                <CardHeader className="pb-4">
                                    <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                        <feature.icon className="h-8 w-8 text-white dark:text-black" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold dark:text-white">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Categories Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Popular Categories</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Explore our curated collections across all fashion categories
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularCategories.map((category, index) => (
                            <Link key={index} href={category.href} className="group">
                                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/50">
                                    <div className="relative overflow-hidden">
                                        <img 
                                            src={category.image} 
                                            alt={category.name}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 dark:bg-black/40 dark:group-hover:bg-black/50 transition-colors duration-300"></div>
                                    </div>
                                    <CardHeader className="text-center">
                                        <CardTitle className="text-xl font-semibold group-hover:text-black dark:text-white dark:group-hover:text-gray-200 transition-colors">
                                            {category.name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 dark:text-gray-400">
                                            {category.count}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Discover our most popular and trending pieces
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 dark:bg-gray-900 dark:border-gray-800 dark:shadow-gray-900/50">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Button className="absolute top-4 right-4 bg-black/80 hover:bg-black dark:bg-white/90 dark:hover:bg-white text-white dark:text-black">
                                        <ShoppingBag className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-semibold dark:text-white">{product.name}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews})</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-2xl font-bold text-black dark:text-white">{product.price}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-900 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust Black Shop
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-white/5 dark:bg-gray-800/50 border-white/10 dark:border-gray-700 text-white dark:text-gray-100">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img 
                                            src={testimonial.avatar} 
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-400 dark:text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 dark:text-gray-300 leading-relaxed">"{testimonial.content}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-black dark:bg-gray-950">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Elevate Your Style?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join the Black Shop community and discover luxury urban fashion that speaks to your individuality.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/categories">
                            <Button size="lg" variant="outline">
                                Explore Categories
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="default">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Black Shop</h3>
                            <p className="text-gray-400 dark:text-gray-300 mb-4">
                                Luxury urban fashion that defines modern sophistication and street culture.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                                    <Youtube className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Shop</h4>
                            <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                                <li><a href="/categories/clothing" className="hover:text-white transition-colors">Clothing</a></li>
                                <li><a href="/categories/shoes" className="hover:text-white transition-colors">Shoes</a></li>
                                <li><a href="/categories/accessories" className="hover:text-white transition-colors">Accessories</a></li>
                                <li><a href="/categories/sportswear" className="hover:text-white transition-colors">Sportswear</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="/shipping" className="hover:text-white transition-colors">Shipping Info</a></li>
                                <li><a href="/returns" className="hover:text-white transition-colors">Returns</a></li>
                                <li><a href="/size-guide" className="hover:text-white transition-colors">Size Guide</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="/press" className="hover:text-white transition-colors">Press</a></li>
                                <li><a href="/sustainability" className="hover:text-white transition-colors">Sustainability</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 dark:border-gray-800 pt-8 text-center text-gray-400 dark:text-gray-500">
                        <p>&copy; 2024 Black Shop. All rights reserved. Luxury urban fashion for the modern individual.</p>
                    </div>
                </div>
            </footer>
        </AppLayout>
    );
}
