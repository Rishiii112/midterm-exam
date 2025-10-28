import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = '55b3c2a65ff25498dd6ffe998dca82d2'; // replace with your actual Weatherstack key
  private apiUrl = 'http://api.weatherstack.com/current';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?access_key=${this.apiKey}&query=${city}`);
  }
}
