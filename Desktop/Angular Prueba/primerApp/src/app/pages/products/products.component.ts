import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!:Product[];

  //Inyectamos el servicio a consumir dentro del contructor, para esto creamos una propiedad llamada productSvc
  //Inyectamos tambien el shopping cart service donde realizamos la actualizacion de la informacion de nuestro carrito de compras
  constructor(
    private productSvc:ProductsService,
    private shoppingCartSvc:ShoppingCartService
  ) { }

  ngOnInit(): void {
    //Manera de llamar a nuestro observable de nuestro servicio
    //Dentro de este metodo lo que hacemos es realizar la peticion hacia nuestro backend mediante la llamada del metodo get del service
    //Mediante el metodo pipe usamos el operador tap obtenemos la repuesta que nos devuelve el servidor o el backend con nuestra api, al final utilizamos el metodo subscribe del observable
    this.productSvc.getProducts()
      .pipe(tap((productos:Product[]) => {
        this.products = productos;
      }))
      .subscribe();
  }

  //Creamos el metodo que ejecuta la logica con el product que recibe del evento
  addToCart(product:Product):void{
    //Cuando el evento se realiza llamamos al metodo udateCart de nuestro servicio el cual se encarga de realizar el agregado de toda la informacion de nuestro carrito de compras
    this.shoppingCartSvc.udateCart(product);
  }
}
