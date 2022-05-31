import { ItemSubcategoryResponse } from '../itemSubcategory/item-subcategory.payload';

interface ItemPayload {
  id?: number;
  total: number;
  notes?: string;
  income: boolean;
}

export interface ItemRequest extends ItemPayload {
  subcategoryId: number;
}
export interface ItemResponse extends ItemPayload {
  subcategory: ItemSubcategoryResponse;
}
