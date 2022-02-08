import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu/menu.component';
import { ProfileModule } from './profile/profile.module';
import { OrdertiffinComponent } from './ordertiffin/ordertiffin.component';
import { ErrorComponent } from './error/error.component';
import { NgxPaginationModule } from 'ngx-pagination';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AboutusComponent } from './aboutus/aboutus.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    MenuComponent,
    OrdertiffinComponent,
    ErrorComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ProfileModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
