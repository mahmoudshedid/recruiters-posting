import { Department } from './department';
import { Location } from './location';
import { Resource } from './resource';
import { Country } from "./country";

export class Posting extends Resource {
    name: string;
    location: Location;
    department: Department;
    country: Country;
    ref: string;
}