import { Component, ElementRef, HostListener, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Category } from '../../../core/services/product.services'; 
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {
  @Output() categorySelected = new EventEmitter<number>();

  categories: Category[] = [];
  visibleCategories: Category[] = [];
  hiddenCategories: Category[] = [];
  showDropdown = false;

  constructor(private el: ElementRef, private productService: ProductService) {}

  ngOnInit() {
    this.loadCategories();
  }

  ngAfterViewInit() {
    this.updateVisibleCategories();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCategories();
  }

  loadCategories() {
    this.productService.getAllCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.updateVisibleCategories();
      });
  }

  updateVisibleCategories() {
    if (!this.el.nativeElement.querySelector('.category-list')) return;
    const containerWidth = this.el.nativeElement.querySelector('.category-list').offsetWidth;
    const buttonWidth = 100;
    const maxVisible = Math.floor(containerWidth / buttonWidth) - 1;
    this.visibleCategories = this.categories.slice(0, maxVisible);
    this.hiddenCategories = this.categories.slice(maxVisible);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectCategory(categoryId: number) {
    this.categorySelected.emit(categoryId);
  }
}
