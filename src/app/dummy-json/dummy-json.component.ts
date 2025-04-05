import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import {
  DummyJsonService,
  Product,
  ProductsResponse,
} from './dummy-json.service';

@Component({
  selector: 'app-dummy-json',
  imports: [TableModule, CommonModule],
  providers: [DummyJsonService],
  templateUrl: './dummy-json.component.html',
  styleUrl: './dummy-json.component.css',
})
export class DummyJsonComponent {
  products: Product[] = [];
  totalRecords: number = 200;
  loading: boolean = false;

  virtualRowHeight = 32;
  virtualRows = 100;

  aService = inject(DummyJsonService);

  // event type will be LazyLoadEvent in primeng14
  loadProducts($event: TableLazyLoadEvent) {
    console.log('Event:', $event);
    if ($event.rows! == 0) {
      $event.rows = 40;
    }
    this.loading = true;
    this.aService
      .getProducts($event.first || 0, $event.rows!)
      .subscribe((response: ProductsResponse) => {
        this.loading = false;
        this.products = response.products;

        console.log('eventProduct - total:' + this.totalRecords, response);
      });

    $event.forceUpdate!();
  }
}
