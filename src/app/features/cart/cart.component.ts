import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shop/navbar/navbar.component';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.services';

export interface CartItem {
  id: number; 
  product: {
    product_id: number;
    name: string;
    price: number;
    discountedPrice?: number;
    images: string;
    brand:Brand;
    stock:number;
    sizes?: string[];
    colors?: string[];
  };
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Brand {
  brand_id: number;
  name: string;
  logo_url?: string;
}

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: number | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    if (!this.userId) return; 
    this.loadCart();
  }

  loadCart() {
    if (!this.userId) return;
    this.cartService.getCart(this.userId).subscribe({
      next: res => {
        console.log('Raw response', res);
        this.cartItems = res.items.map((i: any) => ({
          id: i.item_id,
          product: i.product,
          quantity: i.quantity,
          selectedColor: i.selectedColor,
          selectedSize: i.selectedSize
        }));
      },
      error: err => {
        console.error('Error response', err);
        console.log('Raw text response:', err.error?.text || err.message);
      }
    });
  }

  get total(): number {
    return this.cartItems.reduce((sum, item) => {
      const price = item.product.discountedPrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);
  }

  getImage(item: CartItem): string {
    try {
      const images = JSON.parse(item.product.images);
      return images[0];
    } catch {
      return '';
    }
  }

  increaseQty(item: CartItem) {
    if (!this.userId) return;
    const newQty = item.quantity + 1;
    this.cartService.updateItem(this.userId, item.id, newQty).subscribe({
      next: () => item.quantity = newQty,
      error: err => console.error(err)
    });
  }

  decreaseQty(item: CartItem) {
    if (!this.userId || item.quantity <= 1) return;
    const newQty = item.quantity - 1;
    this.cartService.updateItem(this.userId, item.id, newQty).subscribe({
      next: () => item.quantity = newQty,
      error: err => console.error(err)
    });
  }

  removeItem(item: CartItem) {
    if (!this.userId) return;
    this.cartService.removeItem(this.userId, item.id).subscribe({
      next: () => this.cartItems = this.cartItems.filter(i => i.id !== item.id),
      error: err => console.error(err)
    });
  }

  goToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  getStockMessage(item: CartItem): string {
    const stock = item.product.stock;
    if (stock <= 10) {
      return `Only ${stock} left!`;
    }
    return `In stock: ${stock}`;
  }
  
  getBrandName(item: CartItem): string {
    return item.product.brand?.name || '';
  }

getBrandLogo(item: CartItem): string {
  return item.product.brand?.logo_url || '';
}

}
