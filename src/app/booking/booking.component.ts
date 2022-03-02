import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGeneratorService } from '../shared/form-generator.service';
import {
  createBookingFormConfig,
  IBookingFormConfig,
} from '../types/booking-form-type';

@Component({
  selector: 'ep-booking',
  template: `
      <div [formGroup]="fg">

        <p-panel [header]="'Personal Information'" [toggleable]="true">
          <ep-personal [control]="fg.get('personalInformation')">
          </ep-personal>
        </p-panel>

        <p-panel [header]="'Seat'" [toggleable]="true">
          <seat [control]="fg.get('seatInformation')"></seat>
        </p-panel>

        <p-panel [header]="'Payment'" [toggleable]="true">
          <ep-payment [control]="fg.get('paymentInformation')"></ep-payment>
        </p-panel>
      
    </div>
`,
})
export class BookingComponent implements OnInit {
  bookingConfig: IBookingFormConfig;
  fg: FormGroup;
  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnInit() {
    this.bookingConfig = createBookingFormConfig();
    this.fg = this.formGeneratorService.generate(this.bookingConfig);
  }
}
