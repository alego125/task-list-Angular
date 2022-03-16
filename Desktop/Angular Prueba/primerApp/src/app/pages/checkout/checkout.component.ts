import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'puppeteer-core';
import { switchMap, tap } from 'rxjs/operators';
import { Details, Order } from 'src/app/shared/Interfaces/oreder.interface';
import { Store } from 'src/app/shared/Interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  //Creamos el objeto model con sus propiedades para ser usadas en el form
  model = {
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  };

  //Creamos la propiedad de cart la cual tendra un array de productos
  cart:Product[] = [];

  //Creamos la propiedad isDelivery que sera booleana y servira para saber si medainte el radiobutton se selecciona delivery o retiro por store
  isDelivery:boolean = false;

  stores:Store[] = []

  //Importamos el data service que se encarga de recuperar la informacion de los stores disponibles
  constructor(
    private dataSvc:DataService
  ) { }

  ngOnInit(): void {
    //Llamamos al metodo getStores en este metodo para que al iniciarse el modulo con la clase automaticamente se llame el metodo y se traigan los stores
    this.getStores();
  }

  //Creamos el metodo para el cambio en los radio buttons
  onPickupOrDelivery(value:boolean):void{
    //Hacemos que la propiedad isDelivery sea igual al valor recibido como parametro que es el valor que trae el radiobutton
    this.isDelivery = value;
  }

  //Creamos el metodo que se encarga de gestionar el submit del formulario, el mismo recibe un valor que es el formulario, hacemos un destructuring para el formulario diciendo que sera de tipo ngForm y el value sera de nombre formData por lo que usamos formData ahora
  onSubmit({value:formData}:NgForm):void{
    //Primero recuperamos los valores del formulario
    console.log("Guardar", formData);
    //Creamos una variable que contendra toda la data de nuestro formulario, ademas de date, pickup la cual tendremos que setearla con la propiedad isDelivery ya sea true o false y la fecha la vamos a recuperar mediante le metodo date de javascript
    const data:Order = {
      ...formData,
      date: this.getCurrentDate(),
      pickup:this.isDelivery
    }

    //Seguidamente llamamos al metodo saveOrder del service y le pasamos la orden que no es mas que la informacion de la variable data de arriba, ademas como es un observable debemos usar el pipe y ademas subscribirnos mediante subscribe
    //En el pipe lo que hacemos es primero con el operador tap mostramos la informacion de la orden guardada en consola para ver lo que se guardo y luego usamos el operador switchMap para guardar la onformacion de la orden en el detalle details
    this.dataSvc.saveOrder(data)
    .pipe(
      tap(res => console.log(res)),
      switchMap(
        (order) => {
          const details = {}
          return this.dataSvc.saveDetailsOrder(details);
        }
      ),
      tap(res => console.log(res))

    )
    .subscribe();
  }



  //Creamos el metodo getStores que se encarga de recuperar los stores desde el service
  private getStores():void{
    this.dataSvc.getStores()
    .pipe(
      tap((stores:Store[]) => this.stores = stores)
    )
    .subscribe();
  }

  //Metodo para recuperar la fecha del pedido
  private getCurrentDate():string{
    //Retornamos la fecha y con tolocaledatestring convertimos esa fecha actual en formato de fecha local y en string
    return new Date().toLocaleDateString();
  }


  //Creamos un metodo para gestionar el manejo de details
  private prepareDetails(): Details[] {
    const details:Details[] = [];
    //Aca lo que hacemos es recorrer nuestro carrito de compras para sacar los details de estos

  }

  //Creamos un metodo para subscribirnos al observable y recuperar la data de details de los productos del carrito y colocarlos dentro de la propiedad de tipo array cart para esta luego usarla para el metodo de arriba prepareDetails
  private getDataCart():void{
    
  }

}
