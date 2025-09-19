import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent {

  menuItems = [
    { label: 'Dashboard', icon: 'fa-solid fa-gauge', route: '/shop/shop-list' },
    { label: 'Profile Page', icon: 'fa-solid fa-user', route: '/profile' },
    { label: 'Orders', icon: 'fa-solid fa-box', route: '/order' },
    { label: 'Report', icon: 'fa-solid fa-chart-line', route: '/report' },
    { label: 'Cart', icon: 'fa-solid fa-cart-shopping', route: '/cart' },
    { label: 'Wishlist', icon: 'fa-solid fa-heart', route: '/wishlist' },
    { label: 'Sign Out', icon: 'fa-solid fa-arrow-right-from-bracket', route: '/logout' }
  ];

  visible = false;

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  constructor(private router: Router) {}
  goTolink(route: string) {
    this.router.navigateByUrl(route); 
  }


}
