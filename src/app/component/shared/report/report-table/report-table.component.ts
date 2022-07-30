import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PaginationResponse } from 'src/app/payload/pagination/pagination-payload';
import { ReportResponse } from 'src/app/payload/report/report.payload';
import { APP_ROUTES } from 'src/app/utils/appRoutes';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit, OnChanges, AfterViewInit {
  GET_APP_TEXT = GET_APP_TEXT;
  APP_ROUTES = APP_ROUTES;
  isLoading = false;
  // Paginator
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  defaultPageSizeOptions = [10, 25, 50, 100]; // Options offered by default.
  pageSizeOptions = [0]; // Options currently available.
  // Multi-select table.
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<ReportResponse>(
    this.allowMultiSelect,
    this.initialSelection
  );

  @Input() reports: ReportResponse[] = [];
  @Input() paginationData: PaginationResponse | null = null;
  currentPage = 0;
  @Output() reportsSelected = new EventEmitter<ReportResponse[]>();
  displayedColumns = [
    'select',
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
  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }
  ngOnInit(): void {
    // Listen to changes in the selection model
    this.selection.changed.subscribe((change) => {
      // And send to the parent component
      this.reportsSelected.emit(this.selection.selected);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadDatasource(this.reports);
  }

  loadDatasource(reports: ReportResponse[]) {
    this.datasource = new MatTableDataSource(reports);
    this.datasource.paginator = this.paginator;
    if (this.paginationData)
      this.pageSizeOptions = [
        ...this.defaultPageSizeOptions,
        this.paginationData.items,
      ].sort();
    else {
      this.pageSizeOptions = [...this.defaultPageSizeOptions];
    }
  }
  // Takes a ISO_8601 string and returns a (Month Day, Year) string.
  formatDate(date: string) {
    return moment(date, moment.ISO_8601).format('LL');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.datasource.data.forEach((row) => this.selection.select(row));
  }
}
