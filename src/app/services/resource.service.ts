import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnknownError } from "../common/error/unknown.error"
import { NotFoundError } from "../common/error/notfound.error"
import { BadRequestError } from "../common/error/badrequest.error"
import { Resource } from '../models/resource';
import { Serializer } from '../models/serializer';
import { Observable } from 'rxjs/Observable';
import { map, retry, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T extends Resource> {

  constructor(
    private httpClient: HttpClient,
    @Inject(String) private url: string,
    @Inject(String) private endpoint: string,
    @Inject(String) private serializer: Serializer,
    @Inject(String) private resourceName: string) { }

  /**
   * Get generic object from API by ID.
   * @param id 
   */
  read(id: number): Observable<T> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}/${id}`)
      .pipe(
        map((data: any) => this.serializer.fromJson(data) as T),
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Get generic object list from API by ID.
   */
  list(): Observable<T[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}`)
      .pipe(
        map((data: any) => this.convertData(data.content)),
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Convert object to serialize.
   * @param data 
   */
  private convertData(data: any): T[] {
    return data.map((item: any) => this.serializer.fromJson(item));
  }

  /**
   * Handle errors from API calling.
   * @param error
   */
  private handleError(error: Response) {
    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error, this.resourceName));
    }

    if (error.status === 400) {
      return Observable.throw(new BadRequestError(error, this.resourceName));
    }

    return Observable.throw(new UnknownError(error))
  }
}
