import { Department } from './department';
import { Location } from './location';
import { Resource } from './resource';
import { Country } from './country';

export class PostingDetails extends Resource {
    name: string;
    location: Location;
    department: Department;
    country: Country;
    jobAd: {
        sections: {
            jobDescription: {
                title: string;
                text: string;
            };
            qualifications: {
                title: string;
                text: string;
            };
        }
    }
}