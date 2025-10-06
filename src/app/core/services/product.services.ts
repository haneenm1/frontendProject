import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number;
}

export interface Brand {
    brand_id: number;
    name: string;
    logo_url?: string;
  }

export interface Product {
  stock: number;
  productId?: number;   
  attributes?: any;
  product_id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  brandName?: string;
  categoryName?: string;
  status: 'available' | 'out_of_stock' | 'draft';
  
}

export interface Discount {
  id: number;
  name: string;
  percentage: number;
  startDate: string;
  endDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';
  private discountApiUrl = 'http://localhost:8080/api/discounts';
  private categoryUrl = 'http://localhost:8080/api/categories';
  private brandUrl = 'http://localhost:8080/api/brands'; 


  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getDiscountByProductId(productId: number): Observable<Discount> {
    return this.http.get<Discount>(`${this.discountApiUrl}/product/${productId}`);
  }

  getProductsByStatus(status: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/filterByStatus?status=${status}`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }


  
  // Categories
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  addCategory(name: string): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, { name });
  }

  updateCategory(id: number, name: string): Observable<Category> {
    return this.http.put<Category>(`${this.categoryUrl}/${id}`, { name });
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.categoryUrl}/${id}`);
  }

  // Brands
  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.brandUrl);
  }

  addBrand(name: string): Observable<Brand> {
    return this.http.post<Brand>(this.brandUrl, { name });
  }

  updateBrand(id: number, name: string): Observable<Brand> {
    return this.http.put<Brand>(`${this.brandUrl}/${id}`, { name });
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.brandUrl}/${id}`);
  }

  
}
