import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../pages/categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../pages/cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'product-view',
        loadChildren: () => import('../pages/product-view/product-view.module').then(m => m.ProductViewPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'categories-list',
        loadChildren: () => import('../pages/categories-list/categories-list.module').then(m => m.CategoriesListPageModule)
      },
      {
        path: 'super-categories',
        loadChildren: () => import('../pages/super-categories/super-categories.module').then(m => m.SuperCategoriesPageModule)
      },
      {
        path: 'brand',
        loadChildren: () => import('../pages/brand/brand.module').then(m => m.BrandPageModule)
      },
      {
        path: 'brand-list',
        loadChildren: () => import('../pages/brand-list/brand-list.module').then(m => m.BrandListPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
