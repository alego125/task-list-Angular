import { Component } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";

@Component({
    selector:'app-cart',
    templateUrl:'./cart.component.html',
    styleUrls:['./cart.component.css']
})

export class CartComponent {
    //Decalaramos las variables que contendran los observables de quantity, total y cart (por eso le colocamos el signo $ por que se trata de observables)
    quantity$ = this.shoppingCartSvc.quantityAction$;
    total$ = this.shoppingCartSvc.totalAction$;
    cart$ = this.shoppingCartSvc.cartAction$;

    constructor( 
        private shoppingCartSvc:ShoppingCartService
     ){}
}