import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  //Para usar el input debemos importar el componente antes
  @Input() text: string = "";
  @Input() color: string = "";

  //Tambien lo que queremos hacer es usar un output para llevar el componente hacia el header para esto primero importamos como hicimos con Input ahora con Output
  //Tambien creamos una nueva instancia de un eventEmitter el cual nos permite emitir informacion hacia afuera del componente
  @Output() btnClick = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  //Creamos la funcion onClick que se encarga de ejecutar la logica del boton
  onClick(){
    //Como el click es lo que queremos emitir hacia afuera lo que hacemos es usar el metodo emit sobre el btnClick
    this.btnClick.emit();
  }

}
