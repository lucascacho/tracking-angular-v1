import { Component, OnInit, VERSION, ViewChild } from "@angular/core";
// import {MatStepper} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";



/**
 * @title Stepper with customized states
 */
@Component({
  selector: "stepper-states-example",
  templateUrl: "stepper-states-example.html",
  styleUrls: ["stepper-states-example.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class StepperStatesExample implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ngVersion: string = VERSION.full;
  matVersion: string = "5.1.0";
  contEstado = 0;
  desactivarStepper = false;
  @ViewChild("stepper") stepper: any;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });

    console.log(this.stepper);
  }
  move(index: number) {
    this.desactivarStepper = false;
    while (this.stepper.selectedIndex < index) {
      this.stepper.selectedIndex++;
      this.contEstado++;
    }
    this.stepper.selectedIndex = index;
    this.desactivarStepper = true;
    // console.log(this.stepper);
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
