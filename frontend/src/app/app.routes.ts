import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  { 
    path: 'gallery', 
    loadComponent: () => import('./components/gallery/gallery').then(m => m.GalleryComponent)
  },
  { 
    path: 'about', 
    loadComponent: () => import('./components/about/about').then(m => m.AboutComponent)
  },
  { 
    path: 'music', 
    loadComponent: () => import('./components/music/music').then(m => m.MusicComponent)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./components/contact/contact').then(m => m.ContactComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./components/admin/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'admin/register',
    loadComponent: () => import('./components/admin/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./components/admin/admin').then(m => m.AdminComponent),
    children: [
      { path: '', redirectTo: 'bodies', pathMatch: 'full' },
      {
        path: 'bodies',
        loadComponent: () => import('./components/admin/bodies/bodies').then(m => m.BodiesComponent)
      },
      {
        path: 'artworks',
        loadComponent: () => import('./components/admin/artworks/artworks').then(m => m.ArtworksComponent)
      },
      {
        path: 'music',
        loadComponent: () => import('./components/admin/music-admin/music-admin').then(m => m.MusicAdminComponent)
      },
      {
        path: 'contacts',
        loadComponent: () => import('./components/admin/contacts/contacts').then(m => m.ContactsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/' }
];
