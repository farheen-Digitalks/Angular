import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-opd-bill',
  imports: [CommonModule, FormsModule, CanvasJSAngularChartsModule],
  templateUrl: './opd-bill.component.html',
  styleUrl: './opd-bill.component.css',
})
export class OpdBillComponent {
  opdBillData: any[] = [];
  filteredData: any[] = [];
  selectedRange: string = '';
  chart: any;
  timeout: any = null;
  chartOptions: any;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getOpdBill();
  }

  getOpdBill() {
    this.api.getOpdBill().subscribe({
      next: (data: any) => {
        console.log(data);
        this.opdBillData = data.data?.data;
        this.filteredData = [...this.opdBillData];
        this.updateChart(); // Update chart initially with all data
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  applyDateRange() {
    const today = new Date();
    let startDate: Date;
    let endDate: Date = new Date(today);

    switch (this.selectedRange) {
      case 'today':
        startDate = new Date(today.setHours(0, 0, 0, 0));
        break;
      case 'last7':
        startDate = new Date();
        startDate.setDate(today.getDate() - 6);
        break;
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        this.filteredData = this.opdBillData;
        this.getChartInstance();
        return;
    }

    this.filteredData = this.opdBillData.filter((bill) => {
      const billDate = new Date(bill.createdAt);
      return billDate >= startDate && billDate <= endDate;
    });

    this.getChartInstance();
  }

  getChartInstance(chart?: any) {
    this.chart = chart;
    this.updateChart();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  updateChart() {
    if (!this.filteredData) return;

    const billMap = new Map<string, number>();

    this.filteredData.forEach((bill) => {
      const dateKey = new Date(bill.createdAt).toISOString().split('T')[0];
      billMap.set(dateKey, (billMap.get(dateKey) || 0) + bill.totalamount);
    });

    const sortedEntries = Array.from(billMap.entries()).sort(
      ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
    );

    const dataPoints = sortedEntries.map(([date, total]) => ({
      label: date,
      y: total,
    }));

    this.chartOptions = {
      animationEnabled: true,
      exportEnabled: false,
      creditText: '', // Hides watermark
      title: {
        text: 'Total Billing Amount Per Day',
      },
      axisX: {
        title: 'Date',
        labelAngle: -45,
      },
      axisY: {
        title: 'Total Amount (₹)',
        prefix: '₹',
        includeZero: true,
      },
      data: [
        {
          type: 'column',
          yValueFormatString: '₹#,##0.##',
          indexLabel: '{y}',
          dataPoints: dataPoints,
        },
      ],
    };

    // this.chart.render();

    // ✅ Delay to ensure chart is ready
    setTimeout(() => {
      if (this.chart) {
        this.chart.render();
        this.cdr.detectChanges(); // Force Angular to detect changes
      }
    }, 0);
  }
}
