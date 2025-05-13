import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  constructor(private productService:ProductService, public loginService:LoginService) { }

  products:Product[] = [];
  productList:Product[] = [];
  categoryList: string[];
  selectedCategory: string = '';
  limit:number = 10;

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data as Product[];
      this.categoryList = [...new Set(this.products.map(product => product.category))];
      this.handleChangeLimit();
    });
  }

  handleChangeLimit() {
    this.productList = this.products.slice(0, this.limit);
  }

  handleChangeCategory() {
    if (this.selectedCategory) {
      this.productList = this.products.filter(product => product.category === this.selectedCategory);
    } else {
      this.productList = this.products.slice(0, this.limit);
    }
  }





}
