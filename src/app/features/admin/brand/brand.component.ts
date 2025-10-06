import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Brand, ProductService } from '../../../core/services/product.services';

@Component({
  selector: 'brand-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'brand.component.html',
  styleUrls: ['brand.component.css']
})
export class BrandComponent {
  brands: Brand[] = [];
  newBrand = '';
  editIndex: number | null = null;
  editBrandName = '';
  @Output() close = new EventEmitter<void>();

  constructor(private productService: ProductService) {
    this.loadBrands();
  }

  loadBrands() {
    this.productService.getAllBrands().subscribe(b => this.brands = b);
  }

  addBrand() {
    if (!this.newBrand.trim()) return;
    this.productService.addBrand(this.newBrand).subscribe(brand => {
      this.brands.push(brand);
      this.newBrand = '';
    });
  }

  deleteBrand(brand: Brand) {
    this.productService.deleteBrand(brand.brand_id).subscribe(() => {
      this.brands = this.brands.filter(b => b.brand_id !== brand.brand_id);
    });
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.editBrandName = this.brands[index].name;
  }

  saveEdit(index: number) {
    const brand = this.brands[index];
    if (!this.editBrandName.trim()) return;
    this.productService.updateBrand(brand.brand_id, this.editBrandName).subscribe(updated => {
      this.brands[index] = updated;
      this.editIndex = null;
      this.editBrandName = '';
    });
  }

  cancelEdit() {
    this.editIndex = null;
    this.editBrandName = '';
  }
}
