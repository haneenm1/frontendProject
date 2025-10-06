import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shop/navbar/navbar.component';
import { WishlistService } from '../../core/services/wishlist.service';
import { AuthService } from '../../core/services/auth.services';

export interface WishlistItem {
  id: number;
  product: {
    product_id: number;
    name: string;
    price: number;
    discountedPrice?: number;
    images: string;
    brand?: Brand;
  };
}

export interface Brand {
  brand_id: number;
  name: string;
  logo_url?: string;
}

@Component({
  selector: 'wishlist',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  userId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    if (!this.userId) return;
    this.loadWishlist();
  }

  loadWishlist() {
    if (!this.userId) return;
    this.wishlistService.getWishlist(this.userId).subscribe({
      next: res => {
        console.log('Raw wishlist response:', res);
        this.wishlistItems = res.items.map((i: any) => ({
          id: i.item_id,
          product: i.product
        }));
        this.errorMessage = null;
      },
      error: err => {
        console.error('Error response:', err);
        this.errorMessage = err.error?.message || 'Failed to load wishlist.';
      }
    });
  }
  
  removeItem(item: WishlistItem) {
    if (!this.userId) return;
    this.wishlistService.removeFromWishlist(item.id).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(i => i.id !== item.id);
      },
      error: err => {
        console.error('Error removing wishlist item:', err);
        this.errorMessage = err.error?.message || 'Failed to remove item.';
      }
    });
  }

  getImage(item: WishlistItem): string {
    try {
      const images = JSON.parse(item.product.images);
      return images[0];
    } catch {
      return '';
    }
  }

  getBrandName(item: WishlistItem): string {
    return item.product.brand?.name || '';
  }

  getBrandLogo(item: WishlistItem): string {
    return item.product.brand?.logo_url || '';
  }
}
