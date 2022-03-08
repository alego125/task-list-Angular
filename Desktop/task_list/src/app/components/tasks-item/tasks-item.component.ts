import { Component, OnInit, Input } from '@angular/core';

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

  //Guardamos el icono en una variable
  faTimes = faTimes;
  
  constructor() { }

  ngOnInit(): void {
  }

}
