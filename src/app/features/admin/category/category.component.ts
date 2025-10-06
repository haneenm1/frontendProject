import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'category-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'category.component.html',
  styleUrls: ['category.component.css']
})
export class CategoryModalComponent {
  @Input() categories: string[] = [];
  @Output() categoriesChange = new EventEmitter<string[]>();
  @Output() close = new EventEmitter<void>();

  newCategory = '';

  addCategory() {
    if (this.newCategory.trim()) {
      this.categories.push(this.newCategory);
      this.categoriesChange.emit(this.categories);
      this.newCategory = '';
    }
  }

  deleteCategory(c: string) {
    this.categories = this.categories.filter(x => x !== c);
    this.categoriesChange.emit(this.categories);
  }
}
