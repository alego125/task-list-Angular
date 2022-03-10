//Utilizamos el output para extraer la funcion onDelete para afuera cuando se hace click para que maneje esta logica la lsita de tareas y no el componente del item de tarea
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Importamos la interface para poder hacer uso de la tareas
import { Task } from 'src/app/task';

//Traemos tambien la base ded atos es decir el JSON con las tareas
import { TASK } from 'src/app/mock-task';

//Importamos el icono de fontawesome que vamos a usar
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.css']
})
export class TasksItemComponent implements OnInit {

  //Inicializamos las tareas con la primer tarea de la lista apra que no de error
  @Input() task:Task = TASK[0];

  //Extraemos mediante el decorador output una nueva instancia a traves del eventemmiter que sera del tipo task
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter;

  //Emitimos la accion de cambiar el remider
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter;

  //Guardamos el icono en una variable
  faTimes = faTimes;
  
  constructor() { }

  ngOnInit(): void {
  }

  //Creamos el metodo onDelete para que cuando demos click se borre la tarea
  onDelete(task:Task){
    //Ahora lo que hacemos es emitir este parametro task recibirdo mediante la funcion emit de onDeleteTask
    //Esto lo que hara es pasarle a traves del output al componente padre el parametro task recibido. El componente padre es el compónente task
    this.onDeleteTask.emit(task);
  }

  //Creamos el metodo onToggle task para iterar entre que un task sea reminder o no cuando hacemos click sobre el 
  onToggle(task:Task){
    //Con esto si el usuario hace click sobre la tarjeta le estamos diciendo a nuestro task component que se ha ejecutado el metodo onToggle
    this.onToggleReminder.emit(task);
  }
}
