//Colocamos en el import el output y el eventEmitter
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Importamos a la interface Task
import { Task } from 'src/app/task';

//Traemos el servicio creado uiService al componente add task
import { UiService } from 'src/app/service/ui.service';

//Importamos a subscription
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  //HAcemos el output para que cuando se haga el submit del formulario, directamente le pasemos la nueva tarea al componente tareas que teniamos en donde esta la logica de las tareas, y asi le pasamos el evento tambien de crear una nueva tarea
  @Output() onAddTask:EventEmitter<Task> = new EventEmitter();

  //Desde el componente recibimos diferentes valores como son:
  //Cada una de las variables las declaramos y las incializamos para que no devuelvan un error
  text:string = "";
  day:string = "";
  reminder:boolean = false;
  //Variable booleana para controlar el estado de la variable showAddTask
  showAddTask:boolean = false;
  //Definimos tambien la variable subscription
  subscription?:Subscription;

  //Metemos en el constructor al Servicio uiService
  constructor(
    private uiService: UiService
  ) {
    //Realizamos la sigueinte codificacion para poder escuchar el cambio de la variable showAddTask
    this.subscription = this.uiService.onToggle()
        .subscribe(value => {
          this.showAddTask = value
        });
   }

  ngOnInit(): void {
  }

  //Creamos la funcion que se ejecuta al capturar el evento submit del formulario
  onSubmit(){
    console.log(this.text);
    //Esta es una pequeña validacion que corta el onsubmit al ejecutarse
    if(this.text.length === 0){
      //Validamos en caso de que no haya texto en el campo de text, le decimos que si la longitud de text es cero quiere decir que no ha escrito nada por lo que enviamos un mensaje
      alert("Please add Task!");
      return
    }
    //Ahora mediante objetos capturamos los elementos del formulario
    //Mediante deconstruccion sacamos los elementos del this que son los del formulario, luego estos los guardamos en una varaible llamada newTask
    const {text, day, reminder} = this;
    const newTask = {text, day, reminder}

    //Realizamos la emicion de newTask con la informacion de la nueva tarea para que sea recogida por el componente de las tareas en task component
    this.onAddTask.emit(newTask)
  }

}
