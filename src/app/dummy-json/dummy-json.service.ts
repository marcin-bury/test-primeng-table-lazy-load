import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
}

@Injectable()
export class DummyJsonService {
  http = inject(HttpClient);

  getProducts(skip: number, rows: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `https://dummyjson.com/products?limit=${rows}&skip=${skip}`
    );
  }
}
