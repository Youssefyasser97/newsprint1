import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-items',
  template:  ``





})
export class ItemsComponent implements OnInit {


  ngOnInit(){
  this.http.get('http://localhost:3000/api/product/getProduct()').
  subscribe(res =>{this.data=red["data"]}) ;

  }
}
