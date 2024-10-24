import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  /*
  ? Para mantener la información cuando cambiamos de página
  */
  public cacheStore: CacheStore = {
    byCapital:      { query : '', countries: [] },
    byCountries:    { query : '', countries: [] },
    byRegion:       { region : '', countries: [] },
  }


  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  /*
  * Con estos dos métodos almacenamos la información en la caché del navegador
  */
  private saveToLocalStorage(){
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ))
  }

  private loadFromLocalStorage(){
    if ( !localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')! );
  }

  //* Refactorizando el código, creamos este método y luego lo llamamos en los demás
  private getCountriesRequest( url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( () => of([]) ),
    );
  }


  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null ),
        catchError( error => {
          console.log(error);
          return of (null)
        })
      );
  }

  /*
  ? Para que se haga la solicitud debemos de suscribirnos mediante el .subs
  ? Si no hay subscribe la petición sólo está definida
  */
  searchCapital( query: string ): Observable<Country[]>  {
    const url = `${ this.apiUrl }/capital/${ query }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { query, countries }),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchCountry( query: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ query }`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries = { query, countries }),
      tap( () => this.saveToLocalStorage() ),
    );
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries }),
      tap( () => this.saveToLocalStorage() ),
    );
  }


}
