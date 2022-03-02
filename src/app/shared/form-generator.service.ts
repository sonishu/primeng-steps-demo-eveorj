import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SmartFormControl } from '../types/basic-types';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  constructor() {}

  generate(config: any) {
    const fg = new FormGroup({});

    Object.keys(config).forEach((k) => {
      console.log('key', k);
      fg.addControl(k, new SmartFormControl(config[k]));
    });
    return fg;
  }
}
