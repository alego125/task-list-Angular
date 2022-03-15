import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  //Creamos el objeto model con sus propiedades para ser usadas en el form
  model = {
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  };

  stores = [
    {
      "id": 1,
      "name": "Park Row at Beekman St",
      "address": "38 Park Row",
      "city": "New York",
      "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
    },
    {
      "id": 2,
      "name": "Store Alcalá",
      "address": "Calle de Alcalá, 21",
      "city": "Madrid",
      "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
    },
    {
      "id": 3,
      "name": "Chambers and West Broadway",
      "address": "125 Chambers Street",
      "city": "New York",
      "openingHours": "10:00 - 14:00 and 17:00 - 20:30"
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

  //Creamos el metodo para el cambio en los radio buttons
  onPickupOrDelivery(value:boolean):void{
    console.log(value);
  }

}
