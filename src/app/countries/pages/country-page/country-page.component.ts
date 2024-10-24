import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  //! Esto CREO QUE LO HACEMOS PARA COMPROBAR EL ID
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) =>
          this.countriesService.searchCountryByAlphaCode( id )),
      )
      .subscribe( country => {

        //? De esta manera comprobamos si existe el país, si no existe, nos devuelve al home
        if ( !country ) return this.router.navigateByUrl('');
        return this.country = country;
      });
  }
}
