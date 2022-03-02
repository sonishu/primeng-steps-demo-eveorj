import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormGeneratorService } from '../shared/form-generator.service';
import { SmartFormControl } from '../types/basic-types';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FormGeneratorComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FormGeneratorComponent,
    },
  ],
})
export class FormGeneratorComponent
  implements OnInit, ControlValueAccessor, Validator
{
  controls: SmartFormControl<any>[] = [];

  @Input() formConfig: any;
  fg: FormGroup = new FormGroup({});

  onChangeSubs: Subscription[] = [];

  onTouchedCallBack = (value: any) => {};

  constructor(private formGeneratorService: FormGeneratorService) {}
  validate(control: AbstractControl): ValidationErrors {
    if (!this.fg.errors) {
      return this.fg.errors;
    } else {
      return null;
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    //throw new Error('Method not implemented.');
  }

  writeValue(obj: any): void {
    console.log('value written');
    if (obj) {
      this.fg.setValue(obj);
    }
  }
  registerOnChange(fn: any): void {
    console.log('onchange registered');
    const sub = this.fg.valueChanges.subscribe((v) => fn(v));
    this.onChangeSubs.push(sub);
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallBack = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.fg.disable();
    } else {
      this.fg.enable();
    }
  }

  ngOnInit() {
    this.fg = this.formGeneratorService.generate(this.formConfig);
  }

  ngOnDistroy() {
    this.onChangeSubs.forEach((s) => s.unsubscribe());
  }

  getControls() {
    this.controls = [];
    Object.keys(this.fg.controls).forEach((key) =>
      this.controls.push(this.fg.get(key) as SmartFormControl<any>)
    );

    return this.controls;
  }
}
