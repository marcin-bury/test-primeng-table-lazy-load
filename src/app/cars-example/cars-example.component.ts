import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarsExampleService, Car } from './cars-example.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-cars-example',
  providers: [CarsExampleService],
  imports: [CommonModule, TableModule],
  templateUrl: './cars-example.component.html',
  styleUrl: './cars-example.component.css',
})
export class CarsExampleComponent {
  cars!: Car[];

  virtualCars!: Car[];
  loading: boolean = false;
  cols!: Column[];
  tableSize = 'small';

  constructor(private carService: CarsExampleService) {}

  ngOnInit() {
    this.cols = [
      { field: 'id', header: '1-Id' },
      { field: 'vin', header: '2-Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' },
    ];

    this.cars = Array.from({ length: 10000 }).map((_, i) =>
      this.carService.generateCar(i + 1)
    );
    this.virtualCars = Array.from({ length: 10000 });
  }

  loadCarsLazy(event: TableLazyLoadEvent) {
    //simulate remote connection with a timeout
    console.log(event);
    this.loading = true;
    setTimeout(() => {
      //load data of required page
      let loadedCars = this.cars.slice(
        event.first ?? 0,
        (event?.first ?? 0) + (event?.rows ?? 0)
      );

      //populate page of virtual cars
      Array.prototype.splice.apply(this.virtualCars, [
        event.first ?? 0,
        event.rows ?? 0,
        ...loadedCars,
      ]);
      //trigger change detection
      this.loading = false;
      if (event.forceUpdate) {
        event.forceUpdate();
      }
    }, Math.random() * 1000 + 250);
  }
}
