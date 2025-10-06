import { Component, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {
  categories = [
    'Clothing', 'Shoes', 'Accessories', 'Electronics', 'Watches',
    'Bags', 'Beauty', 'Sports', 'Home', 'Kids', 'Toys', 'Books'
  ];

  visibleCategories: string[] = [];
  hiddenCategories: string[] = [];
  showDropdown = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.updateVisibleCategories();
  }

  ngAfterViewInit() {
    this.updateVisibleCategories();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCategories();
  }

  updateVisibleCategories() {
    const containerWidth = this.el.nativeElement.querySelector('.category-list').offsetWidth;
    const buttonWidth = 100;
    const maxVisible = Math.floor(containerWidth / buttonWidth) - 1; 
    this.visibleCategories = this.categories.slice(0, maxVisible);
    this.hiddenCategories = this.categories.slice(maxVisible);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
