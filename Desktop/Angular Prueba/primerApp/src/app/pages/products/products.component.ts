import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
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
  constructor(
    private productSvc:ProductsService
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

}
