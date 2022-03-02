import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export enum ControlType {
  'TextBox' = 'TextBox',
  'DropDown' = 'DropDown',
  MultiSelect = 'MultiSelect',
  DateTime = 'DateTime',
  Radio = 'Radio',
  CheckBox = 'CheckBox',
  Label = 'Label',
}

export interface dataConfig {
  dataSource: Observable<any>;
  keyColumn: string;
  valueColumn: string;
}

export abstract class ConfigItem {
  constructor(obj: Partial<ConfigItem>) {
    Object.assign(this, obj);
  }
  readonly label: string;
  valueType: any;
  initialValue: any;
  name: string;
  controlType: ControlType;
  onChange?: (value: any) => void;
  disableWhen?: Observable<boolean>;
  readonlyWhen?: Observable<boolean>;
  validators?: ValidatorFn[];
  dataConfig?: dataConfig;
  required: boolean;
  placeHolder?: string;
}

export interface IForm {
  controls: { key: string; value: ConfigItem }[];
}

export class DropDownField extends ConfigItem {
  constructor(obj: Partial<DropDownField>) {
    super(obj);
    this.controlType = ControlType.DropDown;
  }
}

export class TextBoxField extends ConfigItem {
  constructor(obj: Partial<TextBoxField>) {
    super(obj);
    this.controlType = ControlType.TextBox;
  }
}

export class DateField extends ConfigItem {
  constructor(obj: Partial<TextBoxField>) {
    super(obj);
    this.controlType = ControlType.DateTime;
  }
}

export class CheckBoxField extends ConfigItem {
  constructor(obj: Partial<TextBoxField>) {
    super(obj);
    this.controlType = ControlType.CheckBox;
  }
}

export class LabelField extends ConfigItem {
  controlType: ControlType.Label;
}

export class SmartFormControl<T extends ConfigItem> extends FormControl {
  constructor(public config: T) {
    super();
    // console.log('hello', config);
    if (this.config.onChange) {
      this.valueChanges.subscribe((v) => {
        console.log('value', v);
        this.config.onChange(v);
      });
    }
    if (this.config?.validators) {
      this.setValidators(this.config.validators);
    }
    this.setValue(this.config.initialValue);
    if (this.config.required) {
      this.setValidators(Validators.required);
    }
  }
}
