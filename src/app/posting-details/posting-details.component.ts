import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostingDetailsService } from '../services/posting-details.service';
import { PostingDetails } from '../models/posting.details';

@Component({
  selector: 'app-posting-details',
  templateUrl: './posting-details.component.html',
  styleUrls: ['./posting-details.component.scss']
})
export class PostingDetailsComponent implements OnInit, OnDestroy {

  // Loading spanner config.
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: boolean = true;

  // Posting details config.
  destroyed$ = new Subject<void>();
  postingId: number;
  posting: PostingDetails;

  constructor(private dataRoute: ActivatedRoute, private postingDetailsService: PostingDetailsService) { }

  ngOnInit(): void {
    // Get Posting id from url.
    this.postingId = this.dataRoute.snapshot.params['postingId'];
    this.loadPostingDetails(this.postingId);
  }

  /**
   * Get Posting details from API
   * @param postingId
   */
  loadPostingDetails(postingId: number) {
    this.postingDetailsService.read(postingId)
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(result => {
        this.posting = result
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

}
