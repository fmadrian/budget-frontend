import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defer, Observable, of, throwError } from 'rxjs';
import {
  ItemSubcategoryRequest,
  ItemSubcategoryResponse,
} from 'src/app/payload/itemSubcategory/item-subcategory.payload';
import { ItemSubcategoryService } from 'src/app/service/itemSubcategory/item-subcategory.service';
import { catchError, switchMap } from 'rxjs/operators';
import { GET_APP_TEXT } from 'src/app/utils/text';
import { ItemResponse } from 'src/app/payload/item/item.payload';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-item-bar',
  templateUrl: './item-bar.component.html',
  styleUrls: ['./item-bar.component.scss'],
})
export class ItemBarComponent implements OnInit {
  GET_APP_TEXT = GET_APP_TEXT;
  subcategories$: Observable<ItemSubcategoryResponse[]> | undefined = // Subcategories observed
    new Observable<ItemSubcategoryResponse[]>();

  itemForm: FormGroup; // Form.
  subcategorySelected: ItemSubcategoryResponse | null = null;

  @Output() itemOutput = new EventEmitter<ItemResponse>();

  constructor(
    private formBuilder: FormBuilder,
    private itemSubcategoryService: ItemSubcategoryService,
    private snackbarService: SnackbarService
  ) {
    this.itemForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      isIncome: [false, [Validators.required]],
      total: [0, [Validators.required, Validators.min(0)]],
      subcategoryName: [, Validators.required],
      notes: [''],
    });
    this.loadCategories();
    // Reset the subcategory selected when there's a change.
    // This is needed in order to add new subcategories.
    this.itemForm.get('subcategoryName')?.valueChanges.subscribe((data) => {
      this.subcategorySelected = null;
    });
  }

  loadCategories(name = '') {
    this.subcategorySelected = null;
    this.subcategories$ = this.itemForm
      .get('subcategoryName')
      ?.valueChanges.pipe(
        switchMap(() => {
          return this.itemSubcategoryService.get(
            this.itemForm.get('subcategoryName')?.value
          );
        }),
        catchError((error) => {
          this.snackbarService.error(error);
          return of([]);
        })
      );
  }

  selectSubcategory(subcategory: ItemSubcategoryResponse | null) {
    this.subcategorySelected = subcategory;
  }

  add() {
    if (this.itemForm.valid) {
      // Get the name.
      let name = this.itemForm.get('subcategoryName')?.value;
      defer(() => {
        if (
          this.subcategorySelected === null &&
          name.toString().trim() !== ''
        ) {
          // Search a category and assign it.
          return this.itemSubcategoryService.getByName(name).pipe(
            catchError((error) => {
              if (error.status !== 404) {
                return throwError(error);
              }
              // Create a category if it doesn't exist
              return this.itemSubcategoryService.create({
                name,
              });
            })
          );
        } else {
          return of(this.subcategorySelected);
        }
      }).subscribe(
        (data) => {
          this.subcategorySelected = data;
          // Once we have the subcategory, we can create the item.
          if (this.subcategorySelected) {
            let newItem: ItemResponse = {
              subcategory: this.subcategorySelected,
              total: this.itemForm.get('total')?.value,
              income: this.itemForm.get('isIncome')?.value,
              notes: this.itemForm.get('notes')?.value,
            };
            this.itemOutput.next(newItem);
          }
        },
        (error) => {
          this.snackbarService.error(error);
        }
      );
    }
  }
  private getSubc(name = '') {
    if (this.subcategorySelected === null && name.toString().trim() !== '') {
      // Search a category and assign it.
      this.itemSubcategoryService.getByName(name).pipe(
        catchError((error) => {
          if (error.status !== 404) {
            return throwError(error);
          }
          // Create a category if it doesn't exist
          return this.itemSubcategoryService.create({
            name,
          });
        }),
        switchMap((data) => {
          // Assign the subcategory created as subcategory selected.
          this.subcategorySelected = data;
          return of();
        })
      );
    }
  }
}
