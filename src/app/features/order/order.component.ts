import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shop/navbar/navbar.component';
import { OrderService, Order } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  userId: number | null = null;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) {}


  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    if (this.userId) {
      this.loadOrders();
    } else {
      console.warn('User not logged in');
    }
  }


  loadOrders() {
    if (!this.userId) return;
  
    this.orderService.getMyOrders(this.userId).subscribe({
      next: (res: Order[]) => {
        console.log('Raw response from API:', res);
  
        this.orders = res.map((o: Order) => {
          let orderDate: Date | undefined = undefined;
          if (o.createdAt) {
            const tempDate = new Date(o.createdAt);
            orderDate = isNaN(tempDate.getTime()) ? undefined : tempDate;
          }
  
          return {
            ...o,
            date: orderDate,
            orderItems: o.orderItems || [],    
            shippings: o.shippings || [],      
            transactions: o.transactions || [],
            showDetails: false                
          };
        });
  
        console.log('Processed orders:', this.orders);
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }
  
  viewOrder(order: Order) {
    order.showDetails = !order.showDetails; 
  }
}
