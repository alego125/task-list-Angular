//Con este componente ya nuestro modulo no esta manejando la logica de llamar la informacion de la base de datos si no que lo que tenemos es un servicio que lo que hace es manejar los datos de la base ded atos o de neustro archivo json y esta es enviada al componente para mostrarlo
import { Injectable } from '@angular/core';
//Importamos la lista de tareas desde TASK para trabajar con ellas
import { TASK } from 'src/app/mock-task';
//Tambien importamos la interface para poder trabajar con ella
import { Task } from 'src/app/task';
//Con las sigientes importaciones vamos a poder hacer peticiones get y post a nuestra base de datos
import {HttpClient, HttpHeaders} from '@angular/common/http'
//Importamos la siguiente libreria que nos va a permitir manejar o definir que un metodo es asincronico
import { Observable, of } from 'rxjs';

//Ahora definimos el httpOptions, y le decimos que los headers que mandamos en la peticion son una nueva instancia de headers, y luego le decimos que lo que le estamos mandando es un Content-type aplicacion de tipo json, es decir le estamos diciendo que el tipo de archivo que le estamos mandando a nuestro servidor es de tipo json
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

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

  //Creamos la funcion encargada de eliminar la tarea y como los procesos hacia la base de datos son procesos asincronos debemos definir los metodos como observables y sera en vez de una lista de tareas como el de arriba solamente una sola tarea por eso no le colocamos los []
  deleteTask(task:Task):Observable<Task>{
    //Aca podemos devolver lo que queramos por ejemplo podriamos devolver un status. Pero lo que vamos a hacer nosotros es devolver la tarea que se elimino
    //Primero definimos la url de la tarea que se elimina
    const url = `${this.apiUrl}/${task.id}`;
    //Luego eliminamos mediante el metodo delete la tarea con la url de la misma y devolvemos esta tarea eliminada
    return this.http.delete<Task>(url)
  }

  //Realizamos la actualizacion de la propiedad reminder de la base de datos
  updateTaskReminder(task:Task):Observable<Task>{
    //Primero creamos una url que sera la del objeto a actualizar dentro del json
    const url = `${this.apiUrl}/${task.id}`;
    //Seguidamente loq ue hacemos es realizar un put sobre esta base de datos y le pasamos la url del elemento mas el task que sera el que se va a actualizar. Al final le agregamos la variable httpOptions que creamos con la informacion del tipo de archivo que le estamos enviando apra que sepa que tipo de informacion estamos manejando cuando hacemos el envio al servidor, de esta manera le informamos al back end que le eestamos enviando un archivo de tipo json en el put en este caso    
    return this.http.put<Task>(url, task, httpOptions)
  }

}
