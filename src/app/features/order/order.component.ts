import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shop/navbar/navbar.component';


interface Order {
  id: number;
  date: Date;
  status: string;
  items: any[];
  total: number;
}

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css']
})
export class OrderComponent {
  orders: Order[] = [
    { id: 101, date: new Date('2025-09-10'), status: 'Processing', items: [{name:'Item 1'}], total: 59.99 },
    { id: 102, date: new Date('2025-09-08'), status: 'Delivered', items: [{name:'Item 1'}, {name:'Item 2'}], total: 120.00 },
    { id: 103, date: new Date('2025-09-05'), status: 'Cancelled', items: [{name:'Item 3'}], total: 39.99 }
  ];

  viewOrder(order: Order) {
    console.log('View order', order);
  }
}
