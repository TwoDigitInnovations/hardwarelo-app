import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const token = localStorage.getItem('token')
const pinCode = localStorage.getItem('pinCode')

const routes: Routes = [
  {
    path: '',
    redirectTo: token || pinCode ? '/tabs/home' : '/main-page',
    // redirectTo: '/main-page',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'product-card',
    loadChildren: () => import('./components/product-card/product-card.module').then(m => m.ProductCardPageModule)
  },
  {
    path: 'offers-card',
    loadChildren: () => import('./components/offers-card/offers-card.module').then(m => m.OffersCardPageModule)
  },
  {
    path: 'categories-card',
    loadChildren: () => import('./components/categories-card/categories-card.module').then(m => m.CategoriesCardPageModule)
  },
  {
    path: 'essentials-card',
    loadChildren: () => import('./components/essentials-card/essentials-card.module').then(m => m.EssentialsCardPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },
  {
    path: 'product-view',
    loadChildren: () => import('./pages/product-view/product-view.module').then(m => m.ProductViewPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'shipping-address',
    loadChildren: () => import('./pages/shipping-address/shipping-address.module').then(m => m.ShippingAddressPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'main-page',
    loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPagePageModule)
  },
  {
    path: 'orders-details',
    loadChildren: () => import('./pages/orders-details/orders-details.module').then(m => m.OrdersDetailsPageModule)
  },
  {
    path: 'super-categories-card',
    loadChildren: () => import('./components/super-categories-card/super-categories-card.module').then(m => m.SuperCategoriesCardPageModule)
  },
  {
    path: 'categories-list',
    loadChildren: () => import('./pages/categories-list/categories-list.module').then(m => m.CategoriesListPageModule)
  },
  {
    path: 'super-categories',
    loadChildren: () => import('./pages/super-categories/super-categories.module').then(m => m.SuperCategoriesPageModule)
  },
  {
    path: 'super-categories-cards',
    loadChildren: () => import('./components/super-categories-cards/super-categories-cards.module').then(m => m.SuperCategoriesCardsPageModule)
  },
  {
    path: 'coupon',
    loadChildren: () => import('./pages/coupon/coupon.module').then(m => m.CouponPageModule)
  },
  {
    path: 'carousel-card',
    loadChildren: () => import('./components/carousel-card/carousel-card.module').then(m => m.CarouselCardPageModule)
  },
  {
    path: 'brand',
    loadChildren: () => import('./pages/brand/brand.module').then(m => m.BrandPageModule)
  },
  {
    path: 'brand-list',
    loadChildren: () => import('./pages/brand-list/brand-list.module').then( m => m.BrandListPageModule)
  },
  {
    path: 'queries',
    loadChildren: () => import('./pages/queries/queries.module').then( m => m.QueriesPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
