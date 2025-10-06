import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl:'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            alert('Login successful!');
            const payload = JSON.parse(atob(res.token.split('.')[1]));
            const role = payload.role;
  
            if (role === 'ADMIN'|| role === "admin") {
              this.router.navigate(['/admin/dashboard']);
            } else if (role === 'CUSTOMER'|| role === 'customer') {
              this.router.navigate(['/shop/shop-list']);
            } else {
              this.router.navigate(['/']);
            }
  
          } else if (res.error) {
            alert('Login failed: ' + res.error);
          }
        },
        error: (err) => {
          console.error(err);
          alert('Invalid email or password!');
        }
      });
  }
  
}  
