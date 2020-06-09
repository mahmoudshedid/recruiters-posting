import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Posting } from '../models/posting';
import { HttpClient } from '@angular/common/http';
import { PostingSerializer } from '../models/posting.serializer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostingService extends ResourceService<Posting> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.API_URL,
      environment.POSTING_URL,
      new PostingSerializer(),
      'Postings'
    );
  }
}
