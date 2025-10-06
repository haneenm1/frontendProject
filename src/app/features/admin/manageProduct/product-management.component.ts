import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModalComponent } from '../../shop/productmodal/product-modal.component';
import { Router } from '@angular/router';
import { BrandComponent } from '../brand/brand.component';
import { CategoryModalComponent } from '../category/category.component';
import { Product, Category, Brand, ProductService } from '../../../core/services/product.services';

@Component({
  selector: 'manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductModalComponent, BrandComponent, CategoryModalComponent],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products: Product[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];

  selectedProduct: Product | null = null;

  searchTerm: string = '';
  filterCategory: string = '';
  filterStatus: 'available' | 'out_of_stock' | 'draft' | '' = '';
  statusOptions: { value: 'available' | 'out_of_stock' | 'draft', label: string }[] = [
    { value: 'available', label: 'Available' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'draft', label: 'Draft' }
  ];

  categoryModalOpen = false;
  brandModalOpen = false;
  showModal = false;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadBrands();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  loadCategories() {
    this.productService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  loadBrands() {
    this.productService.getAllBrands().subscribe({
      next: (data) => this.brands = data,
      error: (err) => console.error('Error loading brands:', err)
    });
  }

  filteredProducts() {
    return this.products.filter(p => {
      const matchesSearch = this.searchTerm 
        ? p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
        : true;

      const matchesCategory = this.filterCategory 
        ? p.categoryName === this.filterCategory 
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
      // TODO: استدعاء API delete من الباك
    }
  }

  viewProduct(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false; 
    this.selectedProduct = null;
  }

  addProduct() {
    this.router.navigateByUrl('admin/addproduct'); 
  }

  openCategoryModal() { this.categoryModalOpen = true; }
  closeCategoryModal() { this.categoryModalOpen = false; }

  openBrandModal() { this.brandModalOpen = true; }
  closeBrandModal() { this.brandModalOpen = false; }
}
