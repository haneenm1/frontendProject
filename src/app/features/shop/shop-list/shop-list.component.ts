import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductModalComponent } from '../productmodal/product-modal.component';

@Component({
  selector: 'app-shop-list',
  imports: [CommonModule,CategoryComponent,NavbarComponent,ProductModalComponent],
  templateUrl: 'shop-list.component.html',
  styleUrls: ['shop-list.component.css']
})

  export class ShopListComponent {
    products = [
      {  id: 1,
        name: 'Modelyn Women Casual Minimalist Leopard Print Blouse', 
        price: 29.99, 
        image: 'assets/images/products.png',
        stock: 10,
        state: 'out of stock',
        discountedPrice: 19.99 ,
        colors: ['Red', 'Blue', 'Black'],
        sizes: ['S', 'M', 'L', 'XL']
      },
      {  id: 2,
        name: 'Modelyn Women Casual Minimalist Leopard Print Blouse', 
        price: 59.99, 
        image: 'assets/images/products.png',
        stock: 10
      
      },
      {  id: 3,
        name: 'Modelyn Women Casual Minimalist Leopard Print Blouse', 
        price: 39.99, 
        image: 'assets/images/products.png',
        stock: 10,
        discountedPrice: 29.99
      },
      { 
        id: 4,
        name: 'Modelyn Women Casual Minimalist Leopard Print Blouse', 
        price: 120.00, 
        stock: 10,
        image: 'assets/images/products.png'
        
      },
      { 
        id: 5,
        name: 'Modelyn Women Casual Minimalist Leopard Print Blouse', 
        price: 120.00, 
        stock: 10,
        image: 'assets/images/products.png'
      },
      { 
        id: 6,
        name: 'Modelyn Women Casual Minimalist Leopard Print Blouse', 
        price: 120.00, 
        stock: 10,
        image: 'assets/images/products.png'
      },
       { 
        id: 7,
        name: 'Modelyn Women Casual Minimalist Leopard Print Blouse', 
        price: 120.00, 
        stock: 10,
        image: 'assets/images/products.png'
      }, { 
        id: 8,
        name: 'Modelyn Women Casual Minimalist Leopard Print Blouse', 
        price: 120.00, 
        stock: 10,
        image: 'assets/images/products.png'
      }
    ];


  selectedProduct: any = null;
  showModal = false;

  openModal(product: any) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.selectedProduct = null;
    this.showModal = false;
  }
  }
  
