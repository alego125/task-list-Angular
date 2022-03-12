import { Component, OnInit } from '@angular/core';

//Realizamos un input del uiservice para poder escucharlo, es decir que cuando le hacemos click al boton se lo pasamos al otro componente
import { UiService } from 'src/app/service/ui.service';

//Tambien importamos a subscription
import { Subscription } from 'rxjs';

//Importamos el routing para saber en que ruta estamos 
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  title:string = 'My list';

  //Declaramos la variable booleana que mostrar el formulario showAddTask
  showAddTask:boolean = false;
  //Definimos la variable subscription que es de tipo subscription y le ponemos el signo de ? por que es opcional
  subscription?: Subscription;

  //Declaramos en el constructor a uiService, y tambien al router
  constructor(
    private uiService:UiService,
    private router:Router
  ) {
    //En el constructor inicializamos a subscription con lo que recibimos del metodo subscribe de onToggle, es decir al hacer clic en el boton recibimos un valor y entonces lo que hacemos al hacer click es asignar ese valor a show addTask
    this.subscription = this.uiService.onToggle()
        .subscribe(value => {
          this.showAddTask = value
        });
   }

  ngOnInit(): void {
  }

  toggleAddTask(){
    //Le pasamos mediante este metodo a uiService para que cuando presionemos en el boton cambien el valor del toggle y muestre u oculte el formulario
    this.uiService.toggleAddTask();
  }

  //Declaramos la sigueinte funcion que recibe el router y nos devuelve la url o path del router
  hasRouter(route:string):boolean{
    //Si el url es exactamente igual route de este componente devolvera verdadero o si no devuelve falso
    return this.router.url === route
  }

}
