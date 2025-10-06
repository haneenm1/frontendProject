import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModalComponent } from '../../shop/productmodal/product-modal.component';
import { Router } from '@angular/router';
import { BrandComponent } from '../brand/brand.component';
import { CategoryModalComponent } from '../category/category.component';

interface Product {
  name: string;
  category: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  brands: string;
  status: 'active' | 'inactive';
  image?: string;
}

@Component({
  selector: 'manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductModalComponent, BrandComponent, CategoryModalComponent], 
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  products: Product[] = [
    { name: 'Leather Jacket', category: 'Clothing',brands:'Nike', price: 120, discountedPrice: 99, stock: 15, status: 'active', image: 'assets/images/products.png' },
    { name: 'Running Shoes', category: 'Shoes', brands:'Nike',price: 80, stock: 25, status: 'active', image: 'assets/images/products.png' },
    { name: 'Smart Watch', category: 'Electronics',brands:'Nike', price: 200, discountedPrice: 180, stock: 10, status: 'inactive', image: 'assets/images/products.png' },
  ];
  
  brands: string[] = ['Nike', 'Adidas', 'Puma'];
  categories = ['Clothing', 'Shoes', 'Electronics'];

  selectedProduct?: Product;

  
  searchTerm: string = '';
  filterCategory: string = '';
  filterStatus: string = '';

  constructor(private router: Router) {}
  
  filteredProducts() {
    return this.products.filter(p => {
      const matchesSearch = this.searchTerm 
        ? p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
        : true;

      const matchesCategory = this.filterCategory 
        ? p.category === this.filterCategory 
        : true;

      const matchesStatus = this.filterStatus 
        ? p.status === this.filterStatus 
        : true;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }


  editProduct(product: Product) {
    console.log('Edit', product);
  }

  deleteProduct(product: Product) {
    if(confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.products = this.products.filter(p => p !== product);
    }
  }

  viewProduct(product: Product) {
    this.selectedProduct = product;
  }

  closeModal() {
    this.selectedProduct = undefined;
  }

  addProduct() {
    this.router.navigateByUrl('admin/addproduct'); 
  }


categoryModalOpen = false;
brandModalOpen = false;

openCategoryModal() { this.categoryModalOpen = true; }
closeCategoryModal() { this.categoryModalOpen = false; }

openBrandModal() { this.brandModalOpen = true; }
closeBrandModal() { this.brandModalOpen = false; }

}
