//Este componente lo unico que hara es recibir la informacion de su componente padre y la pintara en pantalla nada mas, el componente padre es products.component
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //Importamos los productos que son enviados desde el modulo de product
  @Input() product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
