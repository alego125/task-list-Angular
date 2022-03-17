//Con este modulo vamos a realizar la llamada a la api para manejar los datos 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailOrder, Order } from '../Interfaces/oreder.interface';
import { Store } from '../Interfaces/stores.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //Declaramos el parametro que posee la url donde vamos a trabajar para recolectar la informacion 
  private apiUrl='http://localhost:3000';

  //En el constructor llamamos al modulo de angula http ya que vamos a estar trabajando con llamadas http
  constructor(
    private http: HttpClient
  ) { }

  //Creamos el metodo que obtiene los stores de la base de datos, este sera de tipo observable y traera un array de stores
  getStores():Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiUrl}/stores`);
  }

  //En la practica la buena practica seria que se creara un service especifico pra manejar las ordenes de compra pero por practicidad lo vamos a manejar todo junto en el data service con el manejo de los stores tambien 
  //Creamos un metodo saveOrder para guardar la orden, esta sera de tipo observable
  saveOrder(order:Order):Observable<Order>{
    //Retornamos la peticion ene ste caso post que se encarga de guardar la informacion en la url orders, la cual le pasamos como parametro y como segundo parametro le pasamos la orden
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  //Creamos el metodo encargado de guardar el detalle de las ordenes
   saveDetailsOrder(details:DetailOrder):Observable<DetailOrder>{
    return this.http.post<DetailOrder>(`${this.apiUrl}/detailsOrders`,details);
  }

}
