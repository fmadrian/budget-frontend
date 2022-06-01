import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ReportResponse } from 'src/app/payload/report/report.payload';
import { APP_ROUTES } from 'src/app/utils/appRoutes';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit, OnChanges {
  GET_APP_TEXT = GET_APP_TEXT;
  APP_ROUTES = APP_ROUTES;
  isLoading = false;

  @Input() reports: ReportResponse[] = [];
  displayedColumns = [
    'name',
    'date',
    'income',
    'expenses',
    'total',
    'updateButton',
    'copyButton',
  ];
  datasource: MatTableDataSource<ReportResponse> = new MatTableDataSource();
  constructor(private router: Router) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.loadDatasource(this.reports);
  }
  loadDatasource(reports: ReportResponse[]) {
    this.datasource = new MatTableDataSource(reports);
  }
  // Takes a ISO_8601 string and returns a (Month Day, Year) string.
  formatDate(date: string) {
    return moment(date, moment.ISO_8601).format('LL');
  }
}
