import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, ProductService } from '../../../core/services/product.services';

@Component({
  selector: 'category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'category.component.html',
  styleUrls: ['category.component.css']
})
export class CategoryModalComponent {
[x: string]: any;
  categories: Category[] = [];
  newCategory = '';
  editIndex: number | null = null;
  editCategoryName = '';
  @Output() close = new EventEmitter<void>();


  constructor(private productService: ProductService) {
    this.loadCategories();
  }

  loadCategories() {
    this.productService.getAllCategories().subscribe(c => this.categories = c);
  }

  addCategory() {
    if (!this.newCategory.trim()) return;
    this.productService.addCategory(this.newCategory).subscribe(cat => {
      this.categories.push(cat);
      this.newCategory = '';
    });
  }

  deleteCategory(cat: Category) {
    this.productService.deleteCategory(cat.id).subscribe(() => {
      this.categories = this.categories.filter(c => c.id !== cat.id);
    });
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.editCategoryName = this.categories[index].name;
  }

  saveEdit(index: number) {
    const cat = this.categories[index];
    if (!this.editCategoryName.trim()) return;
    this.productService.updateCategory(cat.id, this.editCategoryName).subscribe(updated => {
      this.categories[index] = updated;
      this.editIndex = null;
      this.editCategoryName = '';
    });
  }

  cancelEdit() {
    this.editIndex = null;
    this.editCategoryName = '';
  }
}
