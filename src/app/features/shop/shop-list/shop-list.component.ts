import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductModalComponent } from '../productmodal/product-modal.component';
import { ProductService, Product } from '../../../core/services/product.services';
import { AuthService } from '../../../core/services/auth.services';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [CommonModule, CategoryComponent, NavbarComponent, ProductModalComponent],
  templateUrl: 'shop-list.component.html',
  styleUrls: ['shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  showModal: boolean = false;     

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts('available');
  }

  loadProducts(status: string) {
    this.productService.getAllProducts().pipe(
      map(products => products
        .map(product => ({
          ...product,
          images: this.parseIfString(product.images, []),
          sizes: this.parseIfString(product.sizes, []),
          colors: this.parseIfString(product.colors, []),
          attributes: this.parseIfString(product.attributes, {}),
        }))
        .filter(product => product.status === status) 
      ),
      switchMap(products => {
        const discountObservables = products.map(product =>
          this.productService.getDiscountByProductId(product.product_id).pipe(
            catchError(() => of({ percentage: 0 })),
            map(discount => ({
              ...product,
              discountedPrice: discount.percentage
                ? product.price - (product.price * discount.percentage / 100)
                : undefined
            }))
          )
        );
        return forkJoin(discountObservables);
      })
    ).subscribe({
      next: updatedProducts => {
        this.products = updatedProducts;
        console.log('Filtered products with discounts:', this.products);
      },
      error: err => console.error(err)
    });
  }
  

  private parseIfString<T>(value: T | string, defaultValue: T): T {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value ?? defaultValue;
    } catch {
      return defaultValue;
    }
  }




  filterByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (products) => {
        this.products = products.map(product => ({
          ...product,
          images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images || [],
          sizes: typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes || [],
          colors: typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors || [],
          attributes: typeof product.attributes === 'string' ? JSON.parse(product.attributes) : product.attributes || {}
        }));
      },
      error: (err) => console.error('Error loading products by category:', err)
    });
  }

  

  openModal(product: Product) {
    this.selectedProduct = {
      ...product,
      productId: product.product_id}
    this.showModal = true;
  }

  closeModal() {
    this.selectedProduct = null;
    this.showModal = false;
  }

  addToWishlist(product: Product) {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) return alert('Please login first');

    this.wishlistService.addToWishlist(userId, product.product_id).subscribe({
      next: res => console.log('Added to wishlist', res),
      error: err => console.error(err)
    });
  }
}
