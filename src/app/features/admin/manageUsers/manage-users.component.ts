import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'manage-users',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: 'manage-users.component.html',
  styleUrls: ['manage-users.component.css']
})
export class ManageUsersComponent {
  users: User[] = [
    { id: 1, name: 'Haneen Sabra', email: 'haneen@example.com', phone: '0591234567',  status: 'active' },
    { id: 2, name: 'Ahmad Ali', email: 'ahmad@example.com', phone: '0599876543', status: 'inactive' },
    { id: 3, name: 'Lina Hassan', email: 'lina@example.com', phone: '0591122334', status: 'active' }
  ];

  selectedUser?: User;

  editUser(user: User) {
    console.log('Edit', user);
  }

  deleteUser(user: User) {
    if(confirm(`Are you sure you want to delete "${user.name}"?`)) {
      this.users = this.users.filter(u => u !== user);
    }
  }

  viewUser(user: User) {
    this.selectedUser = user;
  }

  closeModal() {
    this.selectedUser = undefined;
  }
}
