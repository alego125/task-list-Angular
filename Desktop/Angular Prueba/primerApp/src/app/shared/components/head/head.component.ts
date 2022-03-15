import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  //Inyectamos el modulo router de angular para poder hacer redirecciones
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  //Creamos el metodo que nos rediriga hacia el checkout
  goToCheckout():void{
    //Aqui dentro lo que haremos es hacer un navigateTo mediante el metodo navegate, el cual recibe como parametro un array con las rutas hacia donde redireccionara el metodo
    this.router.navigate(['/checkout']);
  }

}
