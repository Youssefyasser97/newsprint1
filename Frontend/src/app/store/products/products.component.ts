import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { NumberFormatStyle, NgIf } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-store-products',
  template:  `\`
  <html ng-app>
  <head>

  <ngx-main-layout>
  <nb-menu [items]="menu"></nb-menu>
  <router-outlet>

    
    <button (click)="getProducts()">show Products</button>

  </router-outlet>


</ngx-main-layout>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Add icon library -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
  #products {
      font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
  }
  
  #products td, #products th {
      border: 1px solid #ddd;
      padding: 8px;
  }
  
  #products tr:nth-child(even){background-color: #f2f2f2;}
  
  #products tr:hover {background-color: red;}
  
  #products th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #4CAF50;
      color: white;
  }
  .btn {
      background-color: DodgerBlue;
      border: none;
      color: white;
      padding: 12px 16px;
      font-size: 16px;
      cursor: pointer;
  }
  
  /* Darker background on mouse-over */
  .btn:hover {
      background-color: RoyalBlue;
  }
  </style>
  </head>
  <body>
  
  <button (click)="getProducts()">show Products</button>
  <table id="products">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>CreatedAt</th>
      <th>UpdatedAt</th>
      <th>Delete</th>
      <th>Edit</th>
      <th>Edit</th>
    </tr>
    <tr>
      <td><input type="text" id="productName" class="form-control"
      formControlName="userNameField" ngModel></td>
      <td><input type="text" id="productPrice" class="form-control"
      formControlName="userNameField" ngModel></td>
      <td><input type="text" id="UpdatedAt" class="form-control"
      formControlName="userNameField" ngModel></td>
      <td><input type="text" id="CreatedAt" class="form-control"
      formControlName="userNameField" ngModel></td>
      <td></td>
      <td></td>
      <td><button (click)="deleteProduct(item._id)">delete</button></td>
      <td><button type="button" class="btn btn-primary" onclick="editProduct()" >Edit a product</button></td>
      </tr>
    <tr>
    <ul>
  <li *ngFor="let item of data">
    <tr>
    <td>{{item.name}}</td>
    <td>{{item.price}}</td>
    <td>{{item.createdAt}}</td>
    <td>{{item.updatedAt}}</td>
    <td>{{item.sellerName}}</td>
    <td><button (click)="deleteProduct(item._id)">delete</button></td>
      <td><button type="button" class="btn btn-primary" onclick="editProduct()" >Edit a product</button></td>
    </tr>
  </li>
  </ul>
  </table>
  </body>

  <form >
  name: <input type="text" name="Name" value="" (keyup)="onKey1($name)"><br>
  price  : <input type="number" name="Price" value="" (keyup)="onKey2($price)"><br>
</form>
<button (click)="AddProduct()">Add product</button>
  </html>
  `

  })

  export class ProductsComponent implements OnInit {
  data =[];

  username = JSON.parse(localStorage.getItem("user"));
  public name='';
  public price:number;


arrayproducts:any=[];
constructor(private httpClient: HttpClient,private router: Router){}



ngOnInit() 
{
     this.httpClient.get('http://localhost:3000/api/product/getProducts').
     subscribe(res =>{this.data=res["data"]});
}


deleteProduct(ident:string)
{
  var config = {
                headers : 
                {
                    'Content-Type':'application/json'
                }
            }
            console.log(ident);
  this.httpClient.delete(environment.apiUrl+'product/deleteProduct/'+ident,config).
  subscribe();
  window.location.reload();
}

  










updateProduct(id:string){

  localStorage.setItem("productID",id);
  localStorage.setItem("updating","true");
  this.router.navigate(["/store/product-update"]);

}













postProduct(data,config){
    
  this.httpClient.post(environment.apiUrl+ 'product/createProduct' ,data,config).subscribe(
      res=>{
        console.log(res)
      }
    );
    this.ngOnInit();
  }
  onKey1(name: KeyboardEvent) { // with type info
    this.name = (<HTMLInputElement>event.target).value;
  };
  onKey2(price: KeyboardEvent) { // with type info
    this.price = parseInt((<HTMLInputElement>event.target).value);
    
  };

    
  AddProduct(){
    var data= JSON.stringify({name:this.name,price:this.price,SellerName:this.username });
    var config ={
      headers : 
    {
'Content-Type' : 'application/json'
    }
  }
  this.postProduct(data,config)
  
}

}

//   addProduct()
//   {
//     var info = 
//     JSON.stringify({name:document.getElementById("productName").value,
//         price:document.getElementById("myText").productPrice})

//         var config = 
//      {
//             headers : 
//             {
//                 'Content-Type': 'application/json'
//             }
//         }
//         this.httpClient.post(environment.apiUrl+'/product/createProduct',info, config)
//         .subscribe((info:any) => {console.log(info);});
//     window.location.reload();
// }
  


  // editProduct(ident:string)
  // {
  //   this.http.patch('http://localhost:3000/api/product/updateProduct/ident').
  //   subscribe();
  //   window.location.reload();
  // }

