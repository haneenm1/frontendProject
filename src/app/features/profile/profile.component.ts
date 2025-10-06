import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shop/navbar/navbar.component';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editingProfile = false;
  editingAddress = false;

  user = {
    name: 'Haneen Sabra',
    email: 'haneen@example.com',
    phone: '+970 599 123 456'
  };

  addresses: Address[] = [
    {
      street: 'Main St 123',
      city: 'Ramallah',
      state: 'Ramallah',
      postalCode: '97000',
      country: 'Palestine',
      isDefault: true
    }
  ];

  toggleProfileEdit() {
    this.editingProfile = !this.editingProfile;
  }

  toggleAddressEdit() {
    this.editingAddress = !this.editingAddress;
  }

  saveProfile() {
    this.editingProfile = false;
    console.log('Profile saved:', this.user);
  }

  saveAddress() {
    this.editingAddress = false;
    console.log('Addresses saved:', this.addresses);
  }

  setDefault(address: Address) {
    this.addresses.forEach(a => a.isDefault = false);
    address.isDefault = true;
  }
}
