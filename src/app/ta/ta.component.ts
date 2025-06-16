import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ta',
  imports: [CommonModule, FormsModule],
  templateUrl: './ta.component.html',
  styleUrl: './ta.component.css',
})
export class TaComponent {
  users: any[] = [];
  searchTerm: string = '';
  doctors: any[] = [];
  filterDoctors: any[] = [];
  allPatients: any[] = [];

  chartData: { doctor: string; count: number }[] = [];

  constructor(private api: ApiService) {
    this.api.testApiCall();
  }

  //  ngOnInit(){
  //   this.api.testApiCall().subscribe(res => {
  //     console.log('Response status:', res.status);
  //     console.log('Body:', res.body);
  //   });
  // }

  ngOnInit(): void {
    // this.api.testApiCall().subscribe((data: any) => {
    //   // console.log('Users:', data);
    //   this.users = data.users;
    // });

    //==> GET all OPD cases
    this.api.testApiCall().subscribe({
      next: (data: any) => {
        this.allPatients = data.outpatientCases;
        this.users = this.allPatients;
        this.generateChartData();

        const doctorSet = new Set(
          this.allPatients
            .map((p: any) => p.consulting_Doctor?.name)
            .filter(Boolean)
        );
        this.doctors = Array.from(doctorSet);
        // console.log(doctorSet);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }


  //==> CHART of opd
  generateChartData(): void {
    const doctorMap = new Map<string, number>();
    this.users.forEach((patient) => {
      const doctor = patient.consulting_Doctor?.name || 'Unknown';
      doctorMap.set(doctor, (doctorMap.get(doctor) || 0) + 1);
    });

    this.chartData = Array.from(doctorMap.entries()).map(([doctor, count]) => ({
      doctor,
      count,
    }));
  }

  searchDoctor() {
    if (this.searchTerm.length >= 2) {
      this.filterDoctors = this.doctors.filter((doctor: any) =>
        doctor.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filterDoctors = [];
    }
  }

  getDoctor(): void {
    this.api.getDoctorByFilter(this.searchTerm).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.users = this.allPatients.filter((p: any) =>
          p.consulting_Doctor?.name
            ?.toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase())
        );

        // console.log(data);
        // if (Array.isArray(data) && data.length > 0) {
        //   const doctor = data[0];
        //   if (doctor.outpatientcases && Array.isArray(doctor.outpatientcases)) {
        //     this.users = doctor.outpatientcases;
        //   } else {
        //     console.warn('No outpatient cases found.');
        //     this.users = [];
        //   }
        // } else {
        //   console.warn('No doctor found.');
        //   this.users = [];
        // }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  selectDoctor(doctor: string): void {
    this.searchTerm = doctor;
    this.filterDoctors = [];
    this.getDoctor();
  }
}
