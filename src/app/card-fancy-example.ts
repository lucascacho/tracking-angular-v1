import {
  Component,
  OnInit,
  VERSION,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
// import {MatStepper} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

export interface datosEnvio {
  nombre: string;
  apellido: string;
  pedido: string;
  direccionE: string;
  estado: string;
  fecDistribucion: string;
  detalle: string;
}

/**
 * @title Card with multiple sections
 */
@Component({
  selector: "card-fancy-example",
  templateUrl: "card-fancy-example.html",
  styleUrls: ["card-fancy-example.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class CardFancyExample implements OnInit, AfterViewInit {
  public datos: datosEnvio = {
    nombre: "Juan",
    apellido: "Perez",
    pedido: "#124124132",
    direccionE: "Ruta 210 12521",
    estado: "Despachado",
    fecDistribucion: "30/11/2020",
    detalle: "..."
  };
  public contClickTest = 1;

  //------------------------------
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ngVersion: string = VERSION.full;
  matVersion: string = "5.1.0";
  contEstado = 0;
  desactivarStepper = false;
  @ViewChild("stepper") stepper: any;
  @ViewChild("stepperRaiz") stepperRaiz: ElementRef;

  //------------------

  ngOnInit() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.actualizarDatos();
    });

    //this.actualizarDatos();
    // console.log(this.stepper);
  }
  actualizarDatos() {
    var detalle: string = "";
    var id = 0;
    switch (this.datos.estado) {
      case "Despachado": {
        id = 0;
        detalle =
          "El vendedor aun tiene tu pedido y lo esta preparando para que lo recojamos";
        this.move(id);
        break;
      }
      case "En camino a Provinter": {
        id = 1;
        detalle =
          "Provinter ya tiene tu pedido y lo esta llevando al centro de distribucion";
        this.move(id);
        break;
      }
      case "Procesando pedido": {
        id = 2;
        detalle =
          "Tu pedido esta siendo procesado en nuestro centro distribucion";
        this.move(id);
        break;
      }
      case "En camino a su casa": {
        id = 3;
        detalle = "Tu pedido salio del CD y esta en ruta a su casa";
        this.move(id);
        break;
      }
      case "Entregado": {
        id = 4;
        detalle = "Entregado";
        this.move(id);
        break;
      }
      case "Entrega Fallida": {
        detalle = "Entrega Fallida";
        this.selectedStreep("errorIcono", "mat-step-icon-selected");
        // this.move(-1);
        break;
      }
      case "Reprogramado": {
        detalle = "Reprogramado";
        this.selectedStreep("reprogramadoIcono", "mat-step-icon-selected");
        //this.move(-2);
        break;
      }
      default: {
        detalle = "";
      }
    }
    this.datos.detalle = detalle;
  }
  selectedStreep(clase: string, claseAbuscar: string = "", id: number = 0) {
    console.log(clase);
    console.log(this.stepper.nativeElement);

    let elemento = this.stepperRaiz.nativeElement.getElementsByClassName(
      claseAbuscar
    );
    console.log(elemento);
    elemento[id].classList.add(clase);
    console.log(elemento);
  }

  selectedStreepDel(clase: string, claseAbuscar: string = "", id: number = 0) {
    let elemento = this.stepperRaiz.nativeElement.getElementsByClassName(
      claseAbuscar
    );
    elemento[id].classList.remove(clase);
  }
  testEstados() {
    var estadosTest = [
      "Despachado",
      "En camino a Provinter",
      "Procesando pedido",
      "En camino a su casa",
      "Entregado",
      "Entrega Fallida",
      "Reprogramado"
    ];
    this.datos.estado = estadosTest[this.contClickTest];
    this.actualizarDatos();

    if (this.contClickTest == estadosTest.length - 1) {
      this.contClickTest = 0;
      this.stepper.reset();
    } else {
      this.contClickTest++;
    }
  }
  //----------------------------
  move(index: number) {
    // this.desactivarStepper = false;
    console.log(index);
    if (index >= 0) {
      while (this.stepper.selectedIndex < index) {
        if (index != 0) {
          this.selectedStreepDel(
            "marginSelected",
            "mat-focus-indicator",
            index - 1
          );
        }
        this.stepper.selectedIndex++;
        this.contEstado++;
      }
      this.selectedStreep("marginSelected", "mat-focus-indicator", index);
      //this.selectedStreep("redimensionarSelected", "mat-step-icon-selected");
      this.stepper.selectedIndex = index;
      // this.desactivarStepper = true;
      // console.log(this.stepper);
    }
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
