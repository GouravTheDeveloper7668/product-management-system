import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import { ConfigApiService } from '../config/config-api.service';
import { LoaderService } from '../loader/loader.service';
import { ToastService } from '../toast-inline/toast.service';
import { Constant } from '../services/constant-URL/constant';

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

  dashboardData() {
    this.loaderService.loader.next(true);

    const url = `${this.configApi.apiUrl}${this.constant.dashboardAPI.cardStatus}`;

    return this.http.get<any>(url).pipe(
      tap((userData) => {
        console.log("Dashboard Landed =>", this.constant.dashboardAPI.cardStatus);
      }),
      finalize(() => {
        this.loaderService.loader.next(false);
      })
    );
  }
}
