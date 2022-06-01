import { Component, OnInit } from '@angular/core';
import { GET_APP_TEXT } from 'src/app/utils/text';
import { APP_ROUTES } from 'src/app/utils/appRoutes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-home',
  templateUrl: './go-home.component.html',
  styleUrls: ['./go-home.component.scss'],
})
export class GoHomeComponent implements OnInit {
  GET_APP_TEXT = GET_APP_TEXT;
  APP_ROUTES = APP_ROUTES;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isHome() {
    return this.router.url === APP_ROUTES.home.concat('/');
  }
}
