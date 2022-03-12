import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

//Esta propiedad de providedIn nos indica que esta propiedad estara disponible para toda mi aplicacion, esto esta relacionado con lo que es la inyecccion de dependencias en angular, este providedIn podria ir tambien dentro del app.module dentro de providers
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //Declaramos una propiedad apiUrl que contendra la url de nuestra api de informacion
  private apiUrl = 'http://localhost:3000/products';

  //Declaramos en el contructor el modulo httpclient
  constructor(private http: HttpClient) { }

  //Creamos el metodo encargado de obtener la infromacion de productos de nuestra api
  //Colocamos que nos va a devolver tanto el observable como el get un array de productos
  
    
  getProducts(): Observable<Product[]> {
    //Dentro del metodo lo que hacemos es devolver mediante el metodo http del modulo httpclient y luego con le metodo get que nos provee angular, este metodo get espera como parametro una url con la cual obtener la informacion y despues opciones pero estas no son obligatorias colocarlas
    return this.http.get<Product[]>(this.apiUrl); 
  }
}
