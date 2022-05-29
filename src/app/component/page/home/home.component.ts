import { Component, OnInit } from '@angular/core';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = GET_APP_TEXT('app', 'name');
  constructor() {}

  ngOnInit(): void {}
}
