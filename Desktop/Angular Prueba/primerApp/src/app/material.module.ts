import { NgModule } from "@angular/core";
//Importamos el tool bar desde material para poder usarlo
import {MatToolbarModule} from "@angular/material/toolbar";
//Importamos el modulo matcardmodule para hacer las tarjetas de los productos
import { MatCardModule } from "@angular/material/card";
//Importamos los botones de material
import { MatButtonModule } from "@angular/material/button";
//Importamos el modulo de iconos de material
import { MatIconModule } from "@angular/material/icon";

//Creamos un decorador el cual marcara el comportamiento de la clase de mas abajo
//Exportamos el modulo de toolbar de material para hacer uso del mismo
@NgModule({
    exports: [MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule]
})

export class MaterialModule{}