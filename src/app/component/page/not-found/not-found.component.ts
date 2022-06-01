import { Component, OnInit } from '@angular/core';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  GET_APP_TEXT = GET_APP_TEXT;
  constructor() {}

  ngOnInit(): void {}
}
