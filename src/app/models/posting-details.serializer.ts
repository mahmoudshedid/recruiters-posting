import { PostingDetails } from './posting.details';

export class PostingDetailsSerializer {
    fromJson(json: any): PostingDetails {
        const postingDetails = new PostingDetails();
        postingDetails.id = json.id;
        postingDetails.name = json.name;
        postingDetails.location = json.location;
        postingDetails.department = json.department;
        postingDetails.country = json.customField[1];
        postingDetails.jobAd = json.jobAd;

        return postingDetails;
    }

    toJson(postingDetails: PostingDetails): any {
        return {
            id: postingDetails.id,
            name: postingDetails.name
        };
    }
}