import { TestBed } from '@angular/core/testing';

import { ItemSubcategoryService } from './item-subcategory.service';

describe('ItemSubcategoryService', () => {
  let service: ItemSubcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSubcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
