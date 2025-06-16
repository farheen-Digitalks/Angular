import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  
  constructor() {
  }

  ngOnInit(){
    // this.id = this.route.snapshot.paramMap.get('id');
    // console.log("id", this.id);
  }
}
