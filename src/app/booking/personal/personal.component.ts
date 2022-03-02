import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  createPersonalInformationFormConfig,
  IPersonalInformationFormConfig,
} from '../../types/booking-form-type';

@Component({
  selector: 'ep-personal',
  template: `<app-form-generator
                [formConfig]="personalInformationConfig"
                [formControl]="formControl">
              </app-form-generator>`,
})
export class PersonalComponent implements OnInit {
  @Input('control') formControl: FormControl;
  personalInformationConfig: IPersonalInformationFormConfig;

  constructor() {}

  ngOnInit() {
    this.personalInformationConfig = createPersonalInformationFormConfig();
  }
}
