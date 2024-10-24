import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  // Ahora nos aseguramos que nuestras regiones tienen que ser del tipo Region.
  // Si intentamos añadir otro nombre o escribimos la región nos dará error porque no es del tipo.
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;


  constructor( private countriesService: CountriesService) { }

  /*
  * Para mantener la información si cambiamos de página
  */
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }


  searchByRegion( region: Region ): void {
    this.selectedRegion = region;

    this.countriesService.searchRegion( region )
    .subscribe( countries => {
      this.countries = countries;
    })
  }

}
