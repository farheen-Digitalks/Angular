import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private opdcase = `${environment.baseUrl}/OutpatientCase`;
  // testApiCall(): Observable<any> {
  //   return this.http.get();
  // }

  getOPDcase(
    page: number = 1,
    limit: number = 100,
    search: string = ''
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    if (search.trim()) {
      params = params.set('search', search);
    }
    return this.http.get<any>(this.opdcase, { params });
  }

  getDoctorByFilter(doctorName: string): Observable<any> {
    let params = new HttpParams();
    if (doctorName) {
      params = params.append('name', doctorName.trim());
    }
    return this.http.get(
      `${environment.baseUrl}/outpatientCase/getByDoctorFilter`,
      { params }
    );
  }

  getUhid(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/uhid`);
  }

  getOpdBill(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/outpatientBill`);
  }
}
