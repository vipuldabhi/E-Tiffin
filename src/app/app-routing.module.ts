import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { HomeComponent } from './home/home.component';
import { OrdertiffinComponent } from './ordertiffin/ordertiffin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ErrorComponent } from './error/error.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {
    path : '',redirectTo : 'home' , pathMatch : 'full'
  },
  {
    path : 'home' , component : HomeComponent ,
  },
  {
    path : 'aboutus' , component : AboutusComponent ,
  },
 
  {
    path : 'menu' , component : MenuComponent ,canActivate : [AuthguardGuard]
  },
  {
    path : 'ordertiffin' , component : OrdertiffinComponent ,canActivate : [AuthguardGuard]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path : 'error', component : ErrorComponent },
  { path: 'deliveryboy', loadChildren: () => import('./deliveryboy/deliveryboy.module').then(m => m.DeliveryboyModule) },
 
  {
    path : '**' , component : PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
