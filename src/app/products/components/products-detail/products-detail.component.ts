import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {
  @Input() product: Product;
  constructor(public modal:NgbActiveModal){}
}
