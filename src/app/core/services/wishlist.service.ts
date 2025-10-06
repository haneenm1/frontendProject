import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8080/api/wishlist';

  constructor(private http: HttpClient) {}

  addToWishlist(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add?userId=${userId}&productId=${productId}`, {});
  }

  removeFromWishlist(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${itemId}`);
  }

  getWishlist(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
