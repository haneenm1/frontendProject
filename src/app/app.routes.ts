import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ShopListComponent } from './features/shop/shop-list/shop-list.component';
import { CartComponent } from './features/cart/cart.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderComponent } from './features/order/order.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AddProductComponent } from './features/admin/addProduct/product-add.component';
import { ProductManagementComponent } from './features/admin/manageProduct/product-management.component';
import { ManageUsersComponent } from './features/admin/manageUsers/manage-users.component';
import { DashboardComponent } from './features/admin/dashborad/dashboard.component';
import { BrandComponent } from './features/admin/brand/brand.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'shop/shop-list', component: ShopListComponent },
   {path: 'cart', component: CartComponent},
   {path: 'wishlist', component: WishlistComponent},
   {path: 'checkout', component: CheckoutComponent},
   {path: 'profile', component: ProfileComponent},
   {path: 'order', component: OrderComponent},
   {path: 'admin/addproduct', component:AddProductComponent},
   {path: 'admin/manageproduct', component:ProductManagementComponent},
   {path: 'admin/manageuser', component:ManageUsersComponent},
   {path: 'admin/dashborad', component:DashboardComponent},
   {path: 'admin/brand', component:BrandComponent},
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
