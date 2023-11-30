import { weatherDatas } from 'src/app/models/interfaces/weatherDatas';
import { WeatherService } from './../../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCity = 'Campinas';
  weatherDatas!: weatherDatas;
  searchIcon = faMagnifyingGlass;


  constructor(private watherservice: WeatherService) { }
  ngOnInit(): void {
    this.getWeatherDatas(this.initialCity)

  }

  getWeatherDatas(cityName: string): void {
    this.watherservice.getWeatherDatas(cityName)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          //console.log(response);
          response && (this.weatherDatas = response)
          console.log(this.weatherDatas)
        },
        error: (error) => console.log(error)
      });
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCity);
    this.initialCity = ''
    console.log()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
