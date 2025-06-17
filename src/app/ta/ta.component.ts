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
  uhid: any[] = [];
  uhidRecords: any[] = [];

  selectedFilter: string = 'all'; 
  filteredUhidRecords: any[] = [];

  chartData: { doctor: string; count: number }[] = [];

  constructor(private api: ApiService) {
    this.api.testApiCall();
    this.api.getUhid();
  }

  ngOnInit(): void {
    //==> GET all OPD cases
    this.api.testApiCall().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.users = data.outpatientCases;
        this.generateChartData();

        const doctorSet = new Set(
          this.users.map((p: any) => p.consulting_Doctor?.name).filter(Boolean)
        );
        this.doctors = Array.from(doctorSet);
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    this.api.getUhid().subscribe({
      next: (data: any) => {
        this.uhid = data.uhids;
        // console.log("Data",data);
        const uhidList = this.uhid.map((item: any) => item._id);

        const uhid = this.users.map((item: any) => item);
        console.log("UHIDS",uhid);

        this.uhidRecords = uhid.filter((record: any) =>
          uhidList.includes(record.uniqueHealthIdentificationId?._id)
        );

        // console.log("Matched records", this.uhidRecords);
        // console.log("ids", uhidList);
        this.filterByTime();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  //==> CHART of opd UHID
  generateChartData(): void {
    const doctorMap = new Map<string, number>();
    this.filteredUhidRecords.forEach((patient) => {
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
        // console.log("Doctor",data);
        this.uhidRecords = this.users.filter((p: any) => //filtering doctor's patient
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


  // ==> Generate chart and data on filter date range 
  filterByTime(): void {
    const now = new Date();
    let fromDate = new Date();

    switch (this.selectedFilter) {
      case 'all':
        this.filteredUhidRecords = [...this.uhidRecords];
        this.generateChartData();
        return; // skip rest

      case 'week':
        const day = now.getDay(); 
        const diffToMonday = (day + 6) % 7; 
        fromDate.setDate(now.getDate() - diffToMonday);
        fromDate.setHours(0, 0, 0, 0);
        break;

      case 'month':
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1); 
        break;

      case 'year':
        fromDate = new Date(now.getFullYear(), 0, 1); 
        break;
    }

    this.filteredUhidRecords = this.uhidRecords.filter((record: any) => {
      console.log(this.filteredUhidRecords);
      const createdAt = new Date(record.createdAt);
      return createdAt >= fromDate && createdAt <= now;
    });

    this.generateChartData();
  }
}



