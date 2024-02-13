import { Routes } from '@angular/router';
import { NewProductComponent } from '../components/product/new-product/new-product.component';
import { authGuard } from '../guards/auth.guard';
import { NotFoundComponent } from '../components/NotFound/NotFound.component';

export const routes: Routes = [
    
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },

  {
    path: 'product-list',
    canActivate: [authGuard],
    loadComponent: () =>  import('../components/product/product-list/product-list.component')
                          .then(c => c.ProductListComponent)
  },

  { path: 'login', 
    loadComponent: () => import('../components/Login/login.component')
                          .then(c => c.LoginComponent)
  },

  { path: '**',
    component: NotFoundComponent 
  },
  
];
