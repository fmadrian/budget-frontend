import { ItemRequest, ItemResponse } from '../item/item.payload';

interface ReportPayload {
  id?: number;
  name: string;
  date: string;
}

export interface ReportRequest extends ReportPayload {
  items: ItemRequest[];
}
export interface ReportResponse extends ReportPayload {
  items: ItemResponse[];
  income: number;
  expenses: number;
  total: number;
}
