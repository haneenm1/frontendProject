import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  addresses: { street: string; city: string; state: string; postal_code: string; country: string; isDefault: boolean }[]
}


interface AuthResponse {
  token: string | null;
  message?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/signup`, data);
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token'); 
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      return payload.userId || null; 
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }
}

