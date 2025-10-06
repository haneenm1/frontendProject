import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shop/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.services';
import { CheckoutService, CheckoutRequest } from '../../core/services/checkout.service';

@Component({
  selector: 'checkout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  step = 1;

  userInfo: { name: string; email: string; phone: string; id: number; defaultAddress?: any } = {
    name: '', email: '', phone: '', id: 0
  };  
  address = { useDefault: true, street: '', city: '', state: '', postal: '', country: '' };
  shippingMethod = 'STANDARD';
  shippingCost = 5;

  paymentMethod = 'CASH';
  card = { number: '', expiry: '', cvv: '' };

  cartItems: any[] = [];
  subtotal = 0;
  discountValue = 0;
  total = 0;

  coupon = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) return;
    this.userInfo.id = userId;

    this.loadUserInfo(userId);
    this.loadCart(userId);
  }

  loadUserInfo(userId: number) {
    this.checkoutService.getUserInfo(userId).subscribe({
      next: user => {
        this.userInfo = { ...user, id: userId };
        if (user.defaultAddress) {
          this.userInfo.defaultAddress = user.defaultAddress;
          this.address = { ...user.defaultAddress, useDefault: true, country: user.defaultAddress.country || '' };
        }
      },
      error: err => console.error('Failed to load user info', err)
    });
  }

  loadCart(userId: number) {
    this.cartService.getCart(userId).subscribe({
      next: res => {
        this.cartItems = res.items.map((i: any) => ({
          itemId: i.item_id,
          name: i.product.name,
          price: i.product.price,
          discountedPrice: i.product.discountedPrice,
          quantity: i.quantity
        }));
        this.calculateTotals();
      },
      error: err => console.error('Failed to load cart', err)
    });
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => {
      const price = item.discountedPrice ?? item.price;
      return sum + price * item.quantity;
    }, 0);

    this.total = this.subtotal - this.discountValue + this.shippingCost;
    this.total = Math.max(this.total, 0);
  }

  applyCoupon() {
    if (!this.coupon || !this.userInfo.id) return;

    this.checkoutService.applyCoupon(this.userInfo.id, this.coupon).subscribe({
      next: res => {
        this.discountValue = res.discount;
        this.calculateTotals();
        alert('Coupon applied successfully!');
      },
      error: err => {
        console.error('Invalid coupon', err);
        alert('Invalid coupon code');
      }
    });
  }

  onShippingChange() {
    if (this.shippingMethod === 'STANDARD') this.shippingCost = 5;
    else if (this.shippingMethod === 'EXPRESS') this.shippingCost = 10;

    this.calculateTotals();
  }

  prevStep() { if (this.step > 1) this.step--; }
  nextStep() { if (this.step < 4) this.step++; }

  placeOrder() {
    const shippingAddress = this.address.useDefault && this.userInfo.defaultAddress
      ? this.userInfo.defaultAddress
      : this.address;
  
    const request: CheckoutRequest = {
      userId: this.userInfo.id,
      paymentMethod: this.paymentMethod,
      shippingAddress,
      couponCode: this.coupon || undefined,
      items: this.cartItems.map(i => ({ itemId: i.itemId, quantity: i.quantity }))
    };
    
    console.log('Checkout request:', request);
    
    this.checkoutService.placeOrder(request).subscribe({
      next: res => {
        console.log('Order placed', res);
    
    
        this.cartService.clearCart(this.userInfo.id).subscribe({
          next: () => {
            console.log('Cart cleared successfully');
            this.cartItems = [];
            this.subtotal = 0;
            this.total = 0;
            this.discountValue = 0;
    
          //  this.router.navigate([, res.orderId]);
          },
          error: (err: any) => {
            console.error('Failed to clear cart', err);
            alert('Order placed but failed to clear cart.');
            this.router.navigate(['/order-success', res.orderId]);
          }
        });
      },
      error: err => {
        console.error('Checkout failed', err);
        alert('Checkout failed. Please try again.');
      }
    });

  }
}  