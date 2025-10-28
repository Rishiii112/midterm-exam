import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  city: string = '';
  weather: any = null;
  errorMessage: string = '';

  constructor(
    private weatherService: WeatherService,
    private cityService: CityService
  ) {}

  searchWeather() {
    this.errorMessage = '';
    this.weather = null;

    if (!this.city.trim()) {
      this.errorMessage = 'Please enter a city name.';
      return;
    }

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        if (data.success === false || !data.location) {
          this.errorMessage = 'City not found. Please try again.';
          this.weather = null;
        } else {
          this.weather = data;
        }
      },
      error: () => {
        this.errorMessage = 'City Not found or API Error.';
      },
    });
  }

  saveCity(cityName: string) {
    this.cityService.addCity(cityName);
    alert(`${cityName} saved!`);
  }
}
