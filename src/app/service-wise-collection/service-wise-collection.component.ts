import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-wise-collection',
  imports: [CommonModule, FormsModule],
  templateUrl: './service-wise-collection.component.html',
  styleUrl: './service-wise-collection.component.css'
})
export class ServiceWiseCollectionComponent {

  constructor(private api: ApiService) { }
}
