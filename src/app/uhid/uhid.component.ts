import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-uhid',
  imports: [CommonModule, FormsModule],
  templateUrl: './uhid.component.html',
  styleUrl: './uhid.component.css'
})
export class UhidComponent {
  uhid: any[] = [];
uhidRecords: any;

  constructor(private api: ApiService){
    // this.api.getUhid();
  }

  ngOnInit(): void {
    // this.api.getUhid().subscribe({
    //   next: (data: any) => {
    //     // console.log(data);
    //     this.uhid = data.uhids;
    //     const allData = this.uhid;
    //     // console.log("All data",allData);
    //     const id = allData.map((item: any) =>{
    //       return item._id;
    //     });
    //     console.log(id);
    //   }, error: (error: any) => {
    //     console.log(error);
    //   },
    // });
  }

}
