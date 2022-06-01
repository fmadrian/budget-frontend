import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ItemRequest, ItemResponse } from 'src/app/payload/item/item.payload';
import { ReportResponse } from 'src/app/payload/report/report.payload';
import { GET_APP_TEXT } from 'src/app/utils/text';
@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss'],
})
export class ItemTableComponent implements OnInit, OnChanges {
  // Text
  GET_APP_TEXT = GET_APP_TEXT;
  // Flags
  isLoading = false;
  @Input() showDeleteButton = true;
  @Input() isIncome = true; // Indicates if the table has to show income or expenses.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<ItemResponse> = new MatTableDataSource();
  displayedColumns = ['subcategory', 'total', 'deleteButton', 'notes'];

  @Input() report: ReportResponse | null = null;
  @Output() reportOutput = new EventEmitter<ReportResponse>();
  itemSelected: ItemRequest | null = null;
  // Form
  itemsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.itemsForm = this.formBuilder.group({
      total: [0, [Validators.min(0)]],
      notes: [''],
    });
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.report) this.loadDataSource(this.report.items);
  }

  loadDataSource(items: ItemResponse[]) {
    items = items.filter((item) => item.income === this.isIncome);
    this.datasource = new MatTableDataSource(items);
  }

  delete(item: ItemResponse) {
    // Delete the item and send the report to the parent component.
    if (this.report) {
      let index = this.report.items.indexOf(item);
      this.report.items = [
        ...this.report.items.slice(0, index),
        ...this.report.items.slice(index + 1, this.report.items.length),
      ];
      this.reportOutput.next(this.report);
    }
    this.itemSelected = null;
  }
  selectItem(item: ItemRequest | null) {
    if (item !== this.itemSelected) {
      this.itemSelected = item;
      // Set the form input values.
      this.itemsForm.get('total')?.setValue(this.itemSelected?.total);
      this.itemsForm.get('notes')?.setValue(this.itemSelected?.notes);
    } else {
      this.itemSelected = null;
    }
    this.itemSelected = item;
  }
  formChanges() {
    if (this.report && this.itemSelected) {
      if (this.itemsForm.get('total')?.valid)
        this.itemSelected.total = this.itemsForm.get('total')?.value;
      if (this.itemsForm.get('notes')?.valid)
        this.itemSelected.notes = this.itemsForm.get('notes')?.value;

      // Send changes to parent component.
      this.reportOutput.next(this.report);
    }
  }
  rearrangeItem(item: ItemResponse, operation: 'up' | 'down') {
    if (this.report) {
      let index = this.report.items.indexOf(item);

      if (operation === 'up' && index > 0 && index < this.report.items.length) {
        this.report.items = [
          ...this.report.items.slice(0, index - 1),
          this.report.items[index],
          this.report.items[index - 1],
          ...this.report.items.slice(index + 1, this.report.items.length),
        ];
      }
      if (operation === 'down' && index < this.report.items.length - 1) {
        this.report.items = [
          ...this.report.items.slice(0, index),
          this.report.items[index + 1],
          this.report.items[index],
          ...this.report.items.slice(index + 2, this.report.items.length),
        ];
      }
      this.reportOutput.next(this.report);
    }
  }
}
