import { Country } from './country.interface';
import { Region } from './region.type';

export interface CacheStore {
    byCapital:    TermCountries;
    byCountries:  TermCountries;
    byRegion:     RegionCountries;
}

export interface TermCountries {
  query: string;
  countries: Country[];
}

export interface RegionCountries {
  region: Region;
  countries: Country[];
}
