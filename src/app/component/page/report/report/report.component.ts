import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, of, pipe } from 'rxjs';
import { concatMap, mergeMap, switchMap } from 'rxjs/operators';
import { ItemResponse } from 'src/app/payload/item/item.payload';
import { ReportResponse } from 'src/app/payload/report/report.payload';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { ReportService } from 'src/app/service/report/report.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { APP_ROUTES } from 'src/app/utils/appRoutes';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  // Text
  GET_APP_TEXT = GET_APP_TEXT;
  APP_ROUTES = APP_ROUTES;
  // Flags
  tableIsVisible = {
    income: false,
    expenses: true,
  };

  report: ReportResponse = {
    name: '',
    date: '',
    items: [],
    income: 0,
    expenses: 0,
    total: 0,
  };
  reportForm: FormGroup = this.formBuilder.group({});
  constructor(
    private reportService: ReportService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // Set a default and load a report.
    this.reportForm = this.formBuilder.group({
      date: [moment(), Validators.required],
      name: ['', [Validators.required, Validators.max(100)]],
    });
    let copy = false;
    // Check if it is copying a report.
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.copy_id) {
        // Copy a certain report (id)
        this.copy(params.copy_id);
      } else if (params.copy) {
        // Copy last report made.
        this.copy();
      }
    });
    // If it isn't copying a report, check if it's updating.
    if (!copy) {
      // Retrieve and id (if there's any) to update the report.
      let id = this.activatedRoute.snapshot.params.id;
      if (id) {
        this.getReport(id);
      }
    }
  }
  // Adds an item to an unsaved report.
  addItemToReport(item: ItemResponse) {
    this.report.items.push(item);
    this.report = { ...this.report };
    this.report = this.reportService.calculateTotals(this.report);
  }
  // Modifies items in an unsaved report
  modifyItems(report: ReportResponse) {
    this.report = { ...this.report };
    this.report = this.reportService.calculateTotals(this.report);
  }

  submit() {
    let request: Observable<ReportResponse>;
    let message: 'msgReportCreated' | 'msgReportUpdated' = 'msgReportCreated'; // Indicates what message to show after sucessfully submitting a report.
    if (this.report.id) {
      // Update
      request = this.reportService.update(
        this.reportService.mapReport(this.report)
      );
      message = 'msgReportUpdated';
    } else {
      // Create
      request = this.reportService.create(
        this.reportService.mapReport(this.report)
      );
    }
    request.subscribe(
      (data) => {
        if (data.id) {
          // Reroute to update page.
          this.router.navigateByUrl(APP_ROUTES.report.update_id(data.id));
          this.snackbarService.information(
            GET_APP_TEXT('report', message)(data.name)
          );
        }
      },
      (error) => {
        this.snackbarService.error(error);
      }
    );
  }

  // Retrieves a report using the API.
  getReport(id: number) {
    this.reportService.get(id).subscribe(
      (data) => {
        this.report = data;
        // Sets the date and name in the form.
        this.fillForm();
      },
      (error) => {
        this.snackbarService.error(error);
      }
    );
  }
  delete() {
    // Displays the dialog, then deletes the report (if the user chooses to do it.)
    this.dialogService
      .confirmationDialog(
        GET_APP_TEXT('report', 'lblDeleteTitle'),
        GET_APP_TEXT('report', 'lblDeleteMessage')(this.report.name)
      )
      .pipe(
        concatMap((result) => {
          if (result && this.report.id) {
            return this.reportService.delete(this.report.id);
          }
          return of(); // void
        })
      )
      .subscribe(
        (data) => {
          // If no data is returned, it means that the user cancelled the action
          if (data) {
            this.snackbarService.information(
              GET_APP_TEXT('report', 'msgReportDeleted')(this.report.name)
            );
            this.router.navigateByUrl(APP_ROUTES.report.search);
          }
        },
        (error) => {
          this.snackbarService.error(error);
        }
      );
  }
  copy(id: number | null = null) {
    let result: Observable<ReportResponse>;
    if (id) {
      result = this.reportService.copy(id);
    } else {
      result = this.reportService.copy();
    }
    result.subscribe(
      (data) => {
        this.report = data;
      },
      (error) => {
        this.snackbarService.information(
          GET_APP_TEXT('report', 'msgCopyFailed')
        );
      }
    );
  }

  // Changes date and name in the report.
  reportChanges() {
    this.report.date = this.reportForm.get('date')?.value.toISOString();
    this.report.name = this.reportForm.get('name')?.value;
  }
  // Fills form inputs with the report values (name and date).
  fillForm() {
    this.reportForm
      .get('date')
      ?.setValue(moment(this.report.date, moment.ISO_8601));
    this.reportForm.get('name')?.setValue(this.report.name);
  }
  toggleTable(name: 'income' | 'expenses') {
    if (name === 'income') {
      this.tableIsVisible.income = !this.tableIsVisible.income;
    } else {
      this.tableIsVisible.expenses = !this.tableIsVisible.expenses;
    }
  }
}
