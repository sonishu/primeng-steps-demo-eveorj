import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  createPaymentInformationFormConfig,
  IPaymentInformationFormConfig,
} from '../../types/booking-form-type';

@Component({
  selector: 'ep-payment',
  template: `
  <app-form-generator
    [formConfig]="paymentInformationConfig"
    [formControl]="formControl">
  </app-form-generator>
  `,
})
export class PaymentComponent implements OnInit {
  @Input('control') formControl: FormControl;
  paymentInformationConfig: IPaymentInformationFormConfig;
  constructor() {}

  ngOnInit() {
    this.paymentInformationConfig = createPaymentInformationFormConfig();
  }
}
