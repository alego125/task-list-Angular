//Este servicio ui lo vamos a usar para mostrar el fromulario segun sea que apretemos en el boton de add task o no 
import { Injectable } from '@angular/core';

//Importamos ubservabel para eventos asincronos
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  //Creamos variable de tipo booleana para ver si se va a mostrar o no se va a mostrar
  private showAddTask:boolean = false;
  //Creamos un subject con el cual vamos a poder escuchar eventos del template, le ponemos que el Subject es de tipo any o sea cualquier evento es lo que vamos a estar ecuchando
  private subject = new Subject<any>();

  constructor() { }

  //Creamos la funcion esta que lo que hara es iterar el valor de la variable boolean showAddTask cuando presionamos cambia a true o false segun sea como se encuentre. Esta es la funcion que definimos en el binding del boton en el componente head component
  toggleAddTask():void{
    console.log("llegada");
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  //Creamos ahora el metodo onToggle de tipo observable que retorna el subject
  onToggle():Observable<any>{
    return this.subject.asObservable();
  }
}
