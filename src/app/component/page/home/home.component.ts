import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/utils/appRoutes';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  GET_APP_TEXT = GET_APP_TEXT;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  createReport() {
    this.router.navigate(['/', APP_ROUTES.report.create], {
      queryParams: { copy: 'last' },
    });
  }
  createReportBlank() {
    this.router.navigateByUrl(APP_ROUTES.report.create);
  }
  searchReport() {
    this.router.navigateByUrl(APP_ROUTES.report.search);
  }
}
