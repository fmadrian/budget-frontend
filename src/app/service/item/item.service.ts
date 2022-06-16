import { Injectable } from '@angular/core';
import { ItemRequest, ItemResponse } from 'src/app/payload/item/item.payload';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  // Transforms a list of ItemResponse into a list of ItemRequest
  mapItems(items: ItemResponse[]) {
    return items.map((item) => this.mapItem(item));
  }
  // Maps an item request into an item response.
  private mapItem(itemRequest: ItemResponse) {
    let item: ItemRequest = {
      income: itemRequest.income,
      id: itemRequest.id,
      total: itemRequest.total,
      notes: itemRequest.notes,
      subcategoryId: itemRequest.subcategory.id
        ? itemRequest.subcategory.id
        : 0,
    };
    return item;
  }
  // Reset the total and notes of an item.
  itemsToZero(items: ItemResponse[]) {
    return items.map((item) => {
      item.id = undefined;
      item.total = 0;
      item.notes = '';
      return item;
    });
  }
}
