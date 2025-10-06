import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  phone = '';
  addresses = [{ street: '', city: '', state: '', postal_code: '', country: '', isDefault: true }];

  constructor(private authService: AuthService, private router: Router) {}

  addAddress() {
    this.addresses.push({ street: '', city: '', state: '', postal_code: '', country: '', isDefault: false });
  }

  removeAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  register() {
    this.authService.register({ name: this.name, email: this.email, password: this.password, phone: this.phone, addresses: this.addresses })
      .subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: err => alert('Register failed!')
      });
  }
}
