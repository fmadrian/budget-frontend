import { Component, OnInit } from '@angular/core';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.scss'],
})
export class InternalErrorComponent implements OnInit {
  GET_APP_TEXT = GET_APP_TEXT;
  constructor() {}

  ngOnInit(): void {}
}
