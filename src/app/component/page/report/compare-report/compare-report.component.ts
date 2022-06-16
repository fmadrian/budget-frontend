import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReportResponse } from 'src/app/payload/report/report.payload';
import { ReportService } from 'src/app/service/report/report.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import {
  getMaxValue,
  getReportItems,
  prepareReports,
} from 'src/app/utils/compare';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-compare-report',
  templateUrl: './compare-report.component.html',
  styleUrls: ['./compare-report.component.scss'],
})
export class CompareReportComponent implements OnInit {
  GET_APP_TEXT = GET_APP_TEXT;

  private reports: ReportResponse[] = [];
  // Income bar chart data
  reportItemsIncome: string[] = [];
  maxValueIncome = 0; // Max value to be shown in the Y axis of the graph.
  dataIncome = '';
  // Expenses bar chart data
  reportItemsExpenses: string[] = [];
  maxValueExpenses = 0; // Max value to be shown in the Y axis of the graph.
  dataExpenses = '';
  // Totals bar chart data
  reportItemsTotals = ['income', 'expenses'];
  maxValueTotals = 0;
  minValueTotals = 0;
  dataTotals = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    let ids: number[] = [];
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          // Get the ids or an empty string.
          ids = params.ids ? params.ids.split(',') : '';
          // Search each report and add them to the array of observables
          const arrObsv: Observable<ReportResponse>[] = [];
          ids.map((id) => {
            arrObsv.push(this.reportService.get(id));
            // Add the report to the array of reports.
          });
          // Wait for all the observables to complete before returning a result.
          return forkJoin(arrObsv);
        })
      )
      .subscribe(
        (reports) => {
          // Get the reports
          this.reports.push(...reports);
          // Get the items
          this.reportItemsIncome = getReportItems(this.reports, true);
          // Create the prepared reports JSON object that will be sent to the graph.
          this.dataIncome = JSON.stringify(
            prepareReports(this.reportItemsIncome, this.reports, true)
          );
          this.maxValueIncome = getMaxValue(this.reports, true);

          // Get expenses data.
          this.reportItemsExpenses = getReportItems(this.reports, false);
          this.dataExpenses = JSON.stringify(
            prepareReports(this.reportItemsExpenses, this.reports, false)
          );
          this.maxValueExpenses = getMaxValue(this.reports, false);
        },
        (error) => {
          this.snackbarService.error(error);
        }
      );
  }
}
