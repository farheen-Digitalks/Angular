import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://hims-rest-api-1-ycxu.onrender.com/v1/OutpatientCase?page=1&limit=25';
  private baseUrl = 'https://hims-rest-api-1-ycxu.onrender.com/v1';
  private doctorParams = `${this.baseUrl}/outpatientCase/getByDoctorFilter`;

  constructor(private http: HttpClient) {}

  // testApiCall() {
  //   // return this.http.get('https://dummyjson.com/test', { observe: 'response' });
  //   fetch('https://dummyjson.com/users')
  //     .then((res) => res.json())
  //     .then(console.log);
  // }

  testApiCall(): Observable<any> {
    // return this.http.get('https://dummyjson.com/users');
    return this.http.get(this.apiUrl);
  }

  getDoctorByFilter(doctorName: string): Observable<any>  {
    let params = new HttpParams();
    if(doctorName){
      params = params.append('name', doctorName.trim());
    }
    return this.http.get(this.doctorParams, {params});
  }
}
