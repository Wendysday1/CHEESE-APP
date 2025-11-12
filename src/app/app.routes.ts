import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'cart',
        loadComponent: () => import('../pages/home/cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'cheese/:id',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/home/item-detail/item-detail.page').then((m) => m.ItemDetailPage),
          },
          {
            path: 'cart',
            loadComponent: () => import('../pages/home/cart/cart.page').then((m) => m.CartPage),
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () => import('../pages/home/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'orders',
    loadComponent: () => import('../pages/home/orders/orders.page').then((m) => m.OrdersPage),
  },
  {
    path: 'change-password',
    loadComponent: () => import('../pages/home/change-password/change-password.page').then((m) => m.ChangePasswordPage),
  },
  {
    path: 'about',
    loadComponent: () => import('../pages/home/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'developers',
    loadComponent: () => import('../pages/home/developers/developers.page').then((m) => m.DevelopersPage),
  },
  {
    path: 'history',
    loadComponent: () => import('../pages/home/history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('../pages/home/contact/contact.page').then((m) => m.ContactPage),
  },
  {
    path: 'login',
    loadComponent: () => import('../pages/home/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('../pages/home/register/register.page').then((m) => m.RegisterPage),
  },
];
