import { Posting } from './posting';

export class PostingSerializer {
    fromJson(json: any): Posting {
        const posting = new Posting();
        posting.id = json.id;
        posting.name = json.name;
        posting.location = json.location;
        posting.department = json.department;
        posting.country = json.customField[1];
        posting.ref = json.ref;

        return posting;
    }

    toJson(posting: Posting): any {
        return {
            id: posting.id,
            name: posting.name
        };
    }
}