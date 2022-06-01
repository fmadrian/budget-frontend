import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ReportRequest,
  ReportResponse,
} from 'src/app/payload/report/report.payload';
import { API_ENDPOINTS } from 'src/app/utils/apiRoutes';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(
    private httpClient: HttpClient,
    private itemService: ItemService
  ) {}

  create(payload: ReportRequest) {
    return this.httpClient.post<ReportResponse>(
      API_ENDPOINTS.report.update,
      payload
    );
  }
  update(payload: ReportRequest) {
    return this.httpClient.put<ReportResponse>(
      API_ENDPOINTS.report.update,
      payload
    );
  }
  search(name: string = '', since: string, until: string) {
    return this.httpClient.get<ReportResponse[]>(API_ENDPOINTS.report.search, {
      params: {
        name,
        since,
        until,
      },
    });
  }
  get(id: number) {
    return this.httpClient.get<ReportResponse>(
      API_ENDPOINTS.report.getById(id)
    );
  }

  delete(id: number) {
    return this.httpClient.delete(API_ENDPOINTS.report.delete(id));
  }

  copy(id: number | null = null) {
    let observ: Observable<ReportResponse>;
    if (id) {
      observ = this.httpClient.get<ReportResponse>(
        API_ENDPOINTS.report.getById(id)
      );
    } else {
      observ = this.httpClient.get<ReportResponse>(
        API_ENDPOINTS.report.getLast
      );
    }
    observ = observ.pipe(
      map((report) => {
        let result: ReportResponse = {
          name: '',
          date: '',
          items: [...this.itemService.itemsToZero(report.items)],
          expenses: 0,
          income: 0,
          total: 0,
        };
        // Remove id and put items without total.
        return result;
      })
    );
    return observ;
  }

  // Maps a report response to return a request.
  mapReport(report: ReportResponse) {
    let request: ReportRequest = {
      id: report.id,
      name: report.name,
      date: report.date,
      items: [...this.itemService.mapItems(report.items)],
    };
    return request;
  }
  // Gets totals (total, income, expenses) in the report.
  calculateTotals(report: ReportResponse) {
    report.income = report.items
      .filter((item) => item.income)
      .map((item) => item.total)
      .reduce((total1, total2) => total1 + total2, 0);
    report.expenses = report.items
      .filter((item) => item.income === false)
      .map((item) => item.total)
      .reduce((total1, total2) => total1 + total2, 0);
    report.total = report.income - report.expenses;

    return report;
  }
}
