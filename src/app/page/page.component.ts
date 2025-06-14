import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page',
  imports: [FormsModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  // id: String | null = null;
  imgUrl = 'https://pin.it/5qePT9Bq6';
  name: String = '';
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    // this.id = this.route.snapshot.paramMap.get('id');
    // console.log("id", this.id);
  }
}
