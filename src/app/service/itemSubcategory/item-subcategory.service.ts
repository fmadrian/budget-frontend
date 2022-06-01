import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from 'src/app/utils/apiRoutes';
import {
  ItemSubcategoryRequest,
  ItemSubcategoryResponse,
} from 'src/app/payload/itemSubcategory/item-subcategory.payload';
@Injectable({
  providedIn: 'root',
})
export class ItemSubcategoryService {
  constructor(private httpClient: HttpClient) {}
  get(name: string) {
    return this.httpClient.get<ItemSubcategoryResponse[]>(
      API_ENDPOINTS.itemSubcategory.search,
      {
        params: {
          name,
        },
      }
    );
  }
  create(payload: ItemSubcategoryRequest) {
    return this.httpClient.post<ItemSubcategoryResponse>(
      API_ENDPOINTS.itemSubcategory.create,
      payload
    );
  }
  getByName(name: string) {
    return this.httpClient.get<ItemSubcategoryResponse>(
      API_ENDPOINTS.itemSubcategory.getByName,
      {
        params: {
          name,
        },
      }
    );
  }
}
