import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})

export class Constant {
    private apiUrl = environment.apiUrl;
    dashboardAPI = {
        cardStatus : 'dashboard-api/status-card'
    }
}