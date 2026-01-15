import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    title: 'Live View - Gastowntest'
  },
  {
    path: 'configuration',
    loadComponent: () =>
      import('./pages/configuration/configuration.page').then(m => m.ConfigurationPage),
    title: 'Configuration - Gastowntest'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
