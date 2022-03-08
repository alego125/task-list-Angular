//Con este componente ya nuestro modulo no esta manejando la logica de llamar la informacion de la base de datos si no que lo que tenemos es un servicio que lo que hace es manejar los datos de la base ded atos o de neustro archivo json y esta es enviada al componente para mostrarlo
import { Injectable } from '@angular/core';
//Importamos la lista de tareas desde TASK para trabajar con ellas
import { TASK } from 'src/app/mock-task';
//Tambien importamos la interface para poder trabajar con ella
import { Task } from 'src/app/task';
//Con las sigientes importaciones vamos a poder hacer peticiones get y post a nuestra base de datos
import {HttpClient, HttpHandler} from '@angular/common/http'
//Importamos la siguiente libreria que nos va a permitir manejar o definir que un metodo es asincronico
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  //Guardamos la url del servidor en un parametro o constante, esto tambien se podria guardar en una variable de entorno
  private apiUrl = 'http://localhost:5001/tasks';

  //Inicializamos en el constructor el metodo de tiopo httpClient
  constructor(
    private http:HttpClient
  ) { }

  //Le decimos que este metodo es un observable de tipo Task[] es decir que sera un metodo asincronico, ya que en la vida real todas estas peticiones a la base de datos son asincronicas 
  getTask():Observable<Task[]>{
    //Mediante la siguiente linea y con el metodo get loq ue hacemos es obtener la lista de tareas
    return this.http.get<Task[]>(this.apiUrl)
  }
}
