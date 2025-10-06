import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CheckoutRequest {
  userId: number;
  paymentMethod: string;
  shippingAddress: any;
  couponCode?: string;
  items: { itemId: number, quantity: number }[];
}

export interface CheckoutResponse {
  orderId: number;
  total: number;
  status: string;
  paymentMethod: string;
  shippingAddress: any;
  items: { productName: string, quantity: number, price: number }[];
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  country: string;
  defaultAddress?: {
    country:string;
    street: string;
    city: string;
    state: string;
    postal: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  
  placeOrder(request: CheckoutRequest): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${this.baseUrl}/checkout`, request, {
      headers: {
        'Content-Type': 'application/json',    
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  
  

  getUserInfo(userId: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.baseUrl}/users/myProfile/${userId}`);
  }
  
  applyCoupon(userId: number, code: string): Observable<{ discount: number }> {
    return this.http.post<{ discount: number }>(`${this.baseUrl}/coupons/apply`, { userId, code });
  }
}

 
