import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CityService } from '../services/city.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-saved-cities',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './saved-cities.component.html',
  styleUrls: ['./saved-cities.component.css'],
})
export class SavedCitiesComponent implements OnInit {
  cities: string[] = [];
  weatherData: any[] = [];

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.cities = this.cityService.getCities();
    this.loadWeatherData();
  }

  loadWeatherData() {
    this.weatherData = [];
    this.cities.forEach((city) => {
      this.weatherService.getWeather(city).subscribe({
        next: (data) => {
          if (data && data.location) {
            this.weatherData.push(data);
          }
        },
        error: () => {
          console.error(`Error fetching data for ${city}`);
        },
      });
    });
  }

  removeCity(city: string) {
    this.cityService.removeCity(city);
    this.cities = this.cityService.getCities();
    this.loadWeatherData(); // refresh after removal
  }
}
