import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/page/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptor/error-interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReportComponent } from './component/page/report/report/report.component';
import { NotFoundComponent } from './component/page/not-found/not-found.component';
import { MatDividerModule } from '@angular/material/divider';
import { SearchReportComponent } from './component/page/report/search-report/search-report.component';
import { InternalErrorComponent } from './component/page/internal-error/internal-error.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { GoHomeComponent } from './component/shared/goHome/go-home/go-home.component';
import { ItemBarComponent } from './component/shared/item/item-bar/item-bar.component';
import { ItemTableComponent } from './component/shared/item/item-table/item-table.component';
import { ReportTableComponent } from './component/shared/report/report-table/report-table.component';
import { ConfirmationDialogComponent } from './component/shared/dialog/confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    NotFoundComponent,
    SearchReportComponent,
    InternalErrorComponent,
    GoHomeComponent,
    ItemBarComponent,
    ItemTableComponent,
    ReportTableComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    // HTTP client
    HttpClientModule,
    // Reactive forms
    ReactiveFormsModule,
    // Angular Material
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
