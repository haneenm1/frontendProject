import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

  addToCart(userId: number, product_id: number, quantity: number, selectedColor: string, selectedSize: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add?userId=${userId}&product_id=${product_id}&quantity=${quantity}&selectedColor=${selectedColor}&selectedSize=${selectedSize}`, 
      {});
  }

  updateItem(userId: number, itemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${itemId}?userId=${userId}&quantity=${quantity}`, {});
  }

  removeItem(userId: number, itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${itemId}?userId=${userId}`);
  }

  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }


  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
  

}
