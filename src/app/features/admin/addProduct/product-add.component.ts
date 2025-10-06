import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  name: string;
  brand: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  status: 'active' | 'inactive';
  image?: string | null;
  colors: string[];
  sizes: string[];
  category: string;
}

@Component({
  selector: 'add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'product-add.component.html',
  styleUrls: ['product-add.component.css']
})
export class AddProductComponent {
  product: Product = {
    name: '',
    brand: '',
    price: 0,
    discountedPrice: undefined,
    stock: 0,
    status: 'active',
    image: null,
    colors: [],
    sizes: [],
    category: ''
  };

  brands: string[] = [
    'Nike', 'Adidas', 'Puma', 'Zara', 'H&M',
    'Levi’s', 'Under Armour', 'Uniqlo', 'Mango', 'Gucci'
  ];

  availableColors = ['Red', 'Blue', 'Green', 'Black', 'White'];
  availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  categories = ['Men', 'Women', 'Kids', 'Sportswear', 'Accessories'];
  statuses = ['active', 'inactive'];

  constructor(private router: Router) {}

  toggleColor(color: string) {
    const index = this.product.colors.indexOf(color);
    if (index > -1) this.product.colors.splice(index, 1);
    else this.product.colors.push(color);
  }

  toggleSize(size: string) {
    const index = this.product.sizes.indexOf(size);
    if (index > -1) this.product.sizes.splice(index, 1);
    else this.product.sizes.push(size);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file.name; 
    }
  }

  saveProduct() {
    if (!this.product.name || !this.product.brand || !this.product.price || !this.product.category) {
      alert('⚠️ Please fill in all required fields.');
      return;
    }

    console.log('✅ Saved Product:', this.product);
    alert('Product added successfully!');
    this.router.navigate(['/admin/products']);
  }

  goToManagement() {
    this.router.navigate(['/admin/manageproduct']);
  }
}
