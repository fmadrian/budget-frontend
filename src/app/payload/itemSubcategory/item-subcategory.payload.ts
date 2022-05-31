import { ItemCategoryPayload } from '../itemCategory/item-category.payload';

interface ItemSubcategoryPayload {
  id?: number;
  name: string;
  notes?: string;
}

export interface ItemSubcategoryRequest extends ItemSubcategoryPayload {
  categoryId?: number;
}
export interface ItemSubcategoryResponse extends ItemSubcategoryPayload {
  category?: ItemCategoryPayload;
}
