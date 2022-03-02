import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  createSeatInformationFormConfig,
  ISeatInformationFormConfig,
} from '../../types/booking-form-type';

@Component({
  selector: 'seat',
  template: `<app-form-generator
              [formConfig]="seatConfig"
              [formControl]="formControl">
            </app-form-generator>`,
})
export class SeatComponent implements OnInit {
  seatConfig: ISeatInformationFormConfig;
  @Input('control') formControl: FormControl;

  constructor() {}

  ngOnInit() {
    this.seatConfig = createSeatInformationFormConfig();
  }
}
