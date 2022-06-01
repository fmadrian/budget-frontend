import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GET_APP_TEXT } from 'src/app/utils/text';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private config: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 3000,
  };
  constructor(private _snackBar: MatSnackBar) {}

  information(message: string) {
    this._snackBar.open(
      message,
      GET_APP_TEXT('snackbar', 'btnOK'),
      this.config
    );
  }

  error(error: any) {
    this._snackBar.open(
      GET_APP_TEXT('snackbar', 'error')(error.message),
      GET_APP_TEXT('snackbar', 'btnOK'),
      this.config
    );
  }
}
