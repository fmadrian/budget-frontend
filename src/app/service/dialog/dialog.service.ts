import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/component/shared/dialog/confirmation-dialog/confirmation-dialog.component';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  confirmationDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title, message },
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {
        // If the result returned by the dialog is undefined, it returns false.
        if (typeof result !== 'boolean') {
          return false;
        }
        return result;
      })
    );
  }
}
