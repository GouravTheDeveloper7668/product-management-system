import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import { ConfigApiService } from '../config/config-api.service';
import { LoaderService } from '../loader/loader.service';
import { ToastService } from '../toast-inline/toast.service';
import { Constant } from '../services/constant-URL/constant';
import { Observable } from 'rxjs';
import { DashboardCard } from './dashboad.component';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private configApi: ConfigApiService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private constant: Constant
  ) { }

  dashboardData(): Observable<DashboardCard[]> {
    this.loaderService.loader.next(true);

    const url = `${this.configApi.apiUrl}${this.constant.dashboardAPI.cardStatus}`;

    return this.http.get<DashboardCard[]>(url).pipe(
      tap((data) => {
        console.log('Dashboard Data:', data);
      }),
      finalize(() => {
        this.loaderService.loader.next(false);
      })
    );
  }

  getCardDataByParams(params: { web: string; status: string; form_track: string; for: string }): Observable<any> {
    this.loaderService.loader.next(true);

    const url = `${this.configApi.apiUrl}${this.constant.dashboardAPI.filterCardStatus}`;

    return this.http.post<any>(url, params).pipe(
      tap({
        error: (err) => console.error('Error fetching card data:', err)
      }),
      finalize(() => this.loaderService.loader.next(false))
    );
  }


}
