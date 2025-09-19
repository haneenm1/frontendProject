import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [CommonModule ,SidebarComponent],
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}
  goToCart() {
    this.router.navigateByUrl('/cart'); 
  }
  goTowishlist() {
    this.router.navigateByUrl('/wishlist'); 
  }


  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
