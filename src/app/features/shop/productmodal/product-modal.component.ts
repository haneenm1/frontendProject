import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: 'product-modal.component.html',
  styleUrls: ['product-modal.component.css']
})
export class ProductModalComponent {
  @Input() product: any = null;   
  @Input() visible = false;       
  @Output() close = new EventEmitter<void>(); 

  selectedColor: string | null = null;
  selectedSize: string | null = null;

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }
}



