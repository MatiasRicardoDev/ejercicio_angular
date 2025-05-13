import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/Product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsDetailComponent } from '../products-detail/products-detail.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  private modalService = inject(NgbModal)
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'actions'];

  @Input() productList: Product[] = [];

  dataSource = new MatTableDataSource<Product>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['productList']) {
      this.dataSource.data = this.productList || [];
    }
  }

  openDetailModal(product: Product) {
    let modalRef = this.modalService.open(ProductsDetailComponent,{centered: true});
    modalRef.componentInstance.product = product;
  }
}
