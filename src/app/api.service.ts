import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'https://hims-rest-api-1-ycxu.onrender.com/v1/OutpatientCase';
  private baseUrl = 'https://hims-rest-api-1-ycxu.onrender.com/v1';
  private doctorParams = `${this.baseUrl}/outpatientCase/getByDoctorFilter`;

  constructor(private http: HttpClient) {}

  testApiCall(page: number = 1, limit: number = 25): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getDoctorByFilter(doctorName: string): Observable<any> {
    let params = new HttpParams();
    if (doctorName) {
      params = params.append('name', doctorName.trim());
    }
    return this.http.get(this.doctorParams, { params });
  }

  getUhid(): Observable<any> {
    return this.http.get(`${this.baseUrl}/uhid`);
  }
}
