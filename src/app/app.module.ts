import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { LoginPageComponent } from './login/components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FakeApiInterceptor } from './login/interceptors/fake-api.interceptor';
import { ProductsPageComponent } from './products/components/products-page/products-page.component';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { ProductsDetailComponent } from './products/components/products-detail/products-detail.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginPageComponent,
    ProductsPageComponent,
    ProductsListComponent,
    ProductsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: FakeApiInterceptor, multi: true}, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
