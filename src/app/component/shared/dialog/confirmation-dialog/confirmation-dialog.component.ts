import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  GET_APP_TEXT = GET_APP_TEXT;

  // Inject the data received.
  // Dialog should receive an object with the string fields title and message
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
    }
  ) {}

  ngOnInit(): void {}
  // Closes the dialog and sends back the result
  close(action: boolean) {
    this.dialogRef.close(action);
  }
}
