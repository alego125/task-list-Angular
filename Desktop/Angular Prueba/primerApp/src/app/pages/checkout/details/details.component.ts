import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  //Creamos los observables y le asignamos los observables de cada uno es decir para uno el service total y el otro el cart action
  //Si estos observables los usamos en nuestro html entonces se debera pintar el contenido de cada uno de ellos
  total$ = this.shoppingCartSrv.totalAction$;
  cart$ = this.shoppingCartSrv.cartAction$;

  //Intectamos el observable de shoppingcartservice
  constructor(private shoppingCartSrv: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
