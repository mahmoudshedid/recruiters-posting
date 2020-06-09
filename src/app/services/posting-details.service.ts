import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { PostingDetails } from '../models/posting.details';
import { HttpClient } from '@angular/common/http';
import { PostingDetailsSerializer } from '../models/posting-details.serializer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostingDetailsService extends ResourceService<PostingDetails> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.API_URL,
      environment.POSTING_DETAILS_URL,
      new PostingDetailsSerializer(),
      'Posting Details'
    );
  }
}
