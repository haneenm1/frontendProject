import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { AuthService } from '../../../core/services/auth.services';
import { Product } from '../../../core/services/product.services';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  @Input() product: Product | null = null;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  selectedColor: string | null = null;
  selectedSize: string | null = null;
  mappedProduct: Product | null = null;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  closeModal() {
    this.close.emit();
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  addToCart(product: Product) {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) return alert('Please login first');

    if (!this.selectedColor || !this.selectedSize) {
      return alert('Please select color and size before adding to cart');
    }

    this.cartService.addToCart(userId, product.product_id, 1, this.selectedColor, this.selectedSize)
      .subscribe({
        next: res => {
          console.log('Added 1 to cart', res);
          this.close.emit();
        },
        error: err => console.error(err)
      });
  }

  addToWishlist() {
    if (!this.product) return;
    const userId = this.authService.getUserIdFromToken();
    if (!userId) return alert('Please login first');

    this.wishlistService.addToWishlist(userId, this.product.product_id).subscribe({
      next: res => console.log('Added to wishlist', res),
      error: err => console.error(err)
    });
  }
}
