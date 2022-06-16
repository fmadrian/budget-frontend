import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GET_APP_TEXT } from 'src/app/utils/text';
@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss'],
})
export class ComparisonTableComponent implements OnInit, OnChanges {
  @Input() reportJSON = '';
  @Input() subgroups: string[] = [];
  reports: any[] = [];
  GET_APP_TEXT = GET_APP_TEXT;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.reportJSON != '') this.reports = JSON.parse(this.reportJSON);
  }

  ngOnInit(): void {}
}
