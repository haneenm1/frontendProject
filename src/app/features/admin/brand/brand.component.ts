import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'brand-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'brand.component.html',
  styleUrls: ['brand.component.css']
})
export class BrandComponent {
  @Input() brands: string[] = [];
  @Output() brandsChange = new EventEmitter<string[]>();
  @Output() close = new EventEmitter<void>();

  newBrand = '';

  addBrand() {
    if (this.newBrand.trim()) {
      this.brands.push(this.newBrand);
      this.brandsChange.emit(this.brands);
      this.newBrand = '';
    }
  }

  deleteBrand(b: string) {
    this.brands = this.brands.filter(x => x !== b);
    this.brandsChange.emit(this.brands);
  }
}
