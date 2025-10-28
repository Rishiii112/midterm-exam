import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CityService {
  private cities: string[] = [];

  addCity(city: string) {
    if (!this.cities.includes(city)) {
      this.cities.push(city);
    }
  }

  getCities() {
    return this.cities;
  }

  removeCity(city: string) {
    this.cities = this.cities.filter((c) => c !== city);
  }
}
