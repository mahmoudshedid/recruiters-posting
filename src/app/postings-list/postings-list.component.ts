import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Subject, pipe } from 'rxjs';
import { PostingService } from '../services/posting.service';
import { Posting } from '../models/posting';

@Component({
  selector: 'app-postings-list',
  templateUrl: './postings-list.component.html',
  styleUrls: ['./postings-list.component.scss']
})
export class PostingsListComponent implements OnInit, OnDestroy {

  // Loading spanner config.
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: boolean = true;

  // Filtring vars.
  countryFilter = new FormControl();
  departmentFilter = new FormControl();
  countryOptions: string[] = [];
  departmentOptions: string[] = [];
  countryFilteredOptions: Observable<string[]>;
  departmentFilteredOptions: Observable<string[]>;
  countryfilterSelected: string = 'All';
  departmentfilterSelected: string = 'All';

  // Posting vars
  postingList: any;
  postingOriginal: Posting[];
  destroyed$ = new Subject<void>();

  constructor(private postingService: PostingService) { }

  ngOnInit(): void {
    this.initPostingsData();
  }

  /**
   * Getting data from API and init data for filter inputs.
   */
  private initPostingsData() {
    this.postingService.list().pipe(
      map(value => {
        // Set data from API to Posting list. 
        this.postingList = value;
        // Make backup from Posting list to use in filter.
        this.postingOriginal = this.postingList;

        // Init data for filter inputs.
        this.countryOptions = value.map(value => value.country.valueLabel);
        this.departmentOptions = value.map(value => value.department.label);
        this.countryOptions = Array.from(new Set(this.countryOptions));
        this.departmentOptions = Array.from(new Set(this.departmentOptions));

        // Set options for filter inputs
        this.countyOptionsInit();
        this.departmentOptionsInit();

        // End loading spanner.
        this.isLoading = false;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  /**
   * Set options for country filtering input.
   */
  private countyOptionsInit() {
    this.countryFilteredOptions = this.countryFilter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.countryOptions))
      );
  }

  /**
   * Set options for department filtering input.
   */
  private departmentOptionsInit() {
    this.departmentFilteredOptions = this.departmentFilter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.departmentOptions))
      );
  }

  /**
   * Init filtering for inputs.
   * @param value 
   * @param options 
   */
  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * When select item from country input.
   * @param event 
   */
  onCountryChange(event) {
    console.log(event.option.value);
    this.countryfilterSelected = event.option.value;
    this.postingListFilter();
  }

  /**
   * When select item from department input.
   * @param event 
   */
  onDepartmentChange(event) {
    this.departmentfilterSelected = event.option.value;
    this.postingListFilter();
  }

  /**
   * Change posting list when select item from inputs filters.
   */
  private postingListFilter() {
    this.postingList = this.postingOriginal;
    this.postingList = this.postingList.filter(value => {
      let newValue;
      if (value.country.valueLabel === this.countryfilterSelected || this.countryfilterSelected === 'All') {
        if (value.department.label === this.departmentfilterSelected || this.departmentfilterSelected === 'All') {
          newValue = value
        }
      }
      return newValue;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

}
