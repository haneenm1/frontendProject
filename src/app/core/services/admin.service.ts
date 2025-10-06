
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface OrderStatusCount {
  status: string;
  count: number;
}

export interface RecentOrder {
  id: number;
  userName: string;
  total: number;
  status: string;
}

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  activeUsers: number;
  revenue: number;
  ordersByStatus: OrderStatusCount[];
  recentOrders: RecentOrder[];
  countLowStockProducts: number;
  countActiveCoupons: number;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.apiUrl}/stats`);
  }
}
