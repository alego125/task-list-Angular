//Este componente lo unico que hara es recibir la informacion de su componente padre y la pintara en pantalla nada mas, el componente padre es products.component
import { Component, Input, OnInit, Output,EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  //Importamos los productos que son enviados desde el modulo de product
  @Input() product!: Product;

  //Creamos el decorador con el evento addToCartClick que sera con el nombre que enviaremos el evento que estamos realizando del click en el boton, este lo recibiremos despues en el componente padre para realizar loq ue sigue de la logica. Este evento que se esta enciando sera igual a una nueva instancia de EventEmmiter de tipo product que esto es lo que utilizamos para realizar mas abajo en el metodo onClick el envio de la informacion al componente padre
  @Output() addToCartClick = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  //Creamos el metodo onClick con la logica para cuando el usuario presione el boton
  onClick(){
    //Con la siguiente linea lo que hacemos es mediante el evento creado en el Output utilizamos el metodo de este llamado emit el cual puede recibir un parametro el cual es el que vamos a emitir hacia el componente padre, pero puede quedar vacio tambien si fuese eso lo que queremos, en este caso vamos a emitir el product del input que declaramos mas arriba, este es el producto que estamos actualmente clickeando el cual lo enviamos completo hacia el componente padre
    this.addToCartClick.emit(this.product)
  }

}
