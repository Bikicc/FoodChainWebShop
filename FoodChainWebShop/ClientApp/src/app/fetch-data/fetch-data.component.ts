import { ProductService } from '../services/ProductService';
import { Config } from './../config';
import { GlobalVar } from './../globalVar';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(
    private http: HttpClient,
    private config: Config,
    private foodMenuService: ProductService) { }

  ngOnInit(): void {
    this.http.get<WeatherForecast[]>(this.config.API_URL + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));

    //this.http.get<number>(this.config.API_URL + 'weatherforecast' + '/10').subscribe(result => { na ovaj nacin zovemo api koj ise nalazi u kontroleru s parametrom 5
    //   console.log(result)
    // }, error => console.error(error));

    // this.foodMenuService.values_SelectAll().subscribe((data: string[]) => {
    //   console.log(data)
    // }, (err: string) => {
    //   console.log(err);
    // })
  }

  // sendEmailPostData() {
  //   this.foodMenuService.postmanTest().subscribe((data: string[]) => {
  //     console.log(data)
  //   }, (err: string) => {
  //     console.log(err);
  //   })
  // }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
