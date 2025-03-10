import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor( private countriesService: CountriesService) { }

  /*
  * Para mantener la información si cambiamos de página
  */
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.query;
  }


  searchByCountry( term: string ): void {
    this.countriesService.searchCountry( term )
    .subscribe( countries => {
      this.countries = countries;
    });
  }

}
