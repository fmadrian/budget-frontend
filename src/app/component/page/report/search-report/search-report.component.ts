import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ReportResponse } from 'src/app/payload/report/report.payload';
import { ReportService } from 'src/app/service/report/report.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { APP_ROUTES } from 'src/app/utils/appRoutes';
import { GET_APP_TEXT } from 'src/app/utils/text';
import { switchMap } from 'rxjs/operators';
import { PaginationResponse } from 'src/app/payload/pagination/pagination-payload';

@Component({
  selector: 'app-search-report',
  templateUrl: './search-report.component.html',
  styleUrls: ['./search-report.component.scss'],
})
export class SearchReportComponent implements OnInit {
  GET_APP_TEXT = GET_APP_TEXT;
  searchForm: FormGroup;
  reports: ReportResponse[] = [];
  selectedReports: ReportResponse[] = []; // Reports selected in the results table.
  paginationData: PaginationResponse | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.searchForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [''],
      since: [
        moment().hour(0).minutes(0).seconds(0).milliseconds(0),
        Validators.required,
      ],
      until: [
        moment().hour(23).minutes(59).seconds(59).milliseconds(999),
        Validators.required,
      ],
    });
  }

  search() {
    let name = this.searchForm.get('name')?.value;

    let since = this.searchForm.get('since')?.value.toISOString();
    let until = this.searchForm.get('until')?.value.toISOString();
    // Get total items and pages and then get the items.

    this.reportService
      .searchSize(name, since, until)
      .pipe(
        switchMap((result) => {
          this.paginationData = result;
          return this.reportService.search(name, since, until);
        })
      )
      .subscribe(
        (data) => {
          this.reports = data;
        },
        (error) => {
          this.snackbarService.error(error);
        }
      );
  }
  changeSelectedReports(data: ReportResponse[]) {
    this.selectedReports = data;
  }
  compare() {
    const ids = this.selectedReports.map((report) => report.id?.toString());
    this.router.navigate([APP_ROUTES.report.compare], {
      queryParams: {
        ids: [...ids].toString(),
      },
    });
  }
}
