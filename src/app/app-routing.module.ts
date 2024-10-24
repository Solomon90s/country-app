import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ByCapitalPageComponent } from './countries/pages/by-capital-page/by-capital-page.component';

const routes: Routes = [
  //? Aquí empezamos a utilizar el lazyload
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule)
  },
  //? En el routing le decimos que si es cualquier ruta incluida la vacía me lleve al countries
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'countries',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
