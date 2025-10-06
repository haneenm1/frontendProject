
import { Component, OnInit } from '@angular/core';
import { AdminService, AdminStats, RecentOrder } from '../../../core/services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,   
  imports: [CommonModule],
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  stats: AdminStats = {
    totalProducts: 0,
    totalOrders: 0,
    activeUsers: 0,
    revenue: 0,
    ordersByStatus: [],
    recentOrders: [],
    countLowStockProducts: 0,
    countActiveCoupons: 0
  };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (res: AdminStats) => {
        console.log('Admin Stats Response:', res);
        this.stats = res;
      },
      error: (err) => {
        console.error('Failed to load admin stats', err);
      }
    });
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'badge-pending';
      case 'PROCESSING': return 'badge-processing';
      case 'SHIPPED': return 'badge-shipped';
      case 'DELIVERED': return 'badge-delivered';
      case 'CANCELLED': return 'badge-cancelled';
      default: return '';
    }
  }

}
