import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
export interface Order {
    orderId: number;
    total: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
    date?: Date;
    orderItems: any[];   
    shippings: any[];    
    transactions: any[]; 
    showDetails?: boolean;
  }
  
  

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }


  getMyOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/myOrder/${userId}`)
      .pipe(
        map(orders => orders.map(o => ({
          ...o,
          date: o.createdAt ? new Date(o.createdAt) : undefined
        })))
      );
  }
  

}
