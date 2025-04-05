import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DummyJsonComponent } from './dummy-json/dummy-json.component';
import { CarsExampleComponent } from './cars-example/cars-example.component';

type FormState = 'Browse' | 'Insert' | 'Edit' | 'Delete';

const stateColors: Record<FormState, string> = {
  Browse: 'bg-neutral-50',
  Insert: 'bg-green-100',
  Edit: 'bg-yellow-100',
  Delete: 'bg-red-300',
};

function getColorForState(state: FormState): string {
  return stateColors[state];
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    DummyJsonComponent,
    CarsExampleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
