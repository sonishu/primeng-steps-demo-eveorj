import { FormGroup, MinValidator, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { DataService } from '../data.service';
import {
  CheckBoxField,
  DateField,
  DropDownField,
  TextBoxField,
} from './basic-types';

export interface IPersonalInformationFormConfig {
  firstName: TextBoxField;
  lastName: TextBoxField;
  age: TextBoxField;
}

export interface ISeatInformationFormConfig {
  class: DropDownField;
  wagon: DropDownField;
  seat: DropDownField;
}

export interface IPaymentInformationFormConfig {
  cardHolderName: TextBoxField;
  cardNumber: TextBoxField;
  cvv: TextBoxField;
  expiry: DateField;
  shouldSaveCreditCardInfo: CheckBoxField;
}

export interface IReviewFormConfig {}

export interface IBookingFormConfig {
  personalInformation: IPersonalInformationFormConfig;
  seatInformation: ISeatInformationFormConfig;
  paymentInformation: IPaymentInformationFormConfig;
  review: IReviewFormConfig;
}

export interface IMeasurementSearch {
  assetGroup: DropDownField;
  product: DropDownField;
}

let dataService = new DataService();

export function createPersonalInformationFormConfig(): IPersonalInformationFormConfig {
  return <IPersonalInformationFormConfig>{
    firstName: new TextBoxField({
      label: 'First Name',
      initialValue: '',
      required: true,
      name: 'firstName',
    }),
    lastName: new TextBoxField({
      label: 'Last Name',
      initialValue: '',
      required: true,
      name: 'lastName',
    }),
    age: new TextBoxField({
      label: 'Age',
      initialValue: 0,
      required: true,
      name: 'age',
      validators: [Validators.min(18)],
    }),
  };
}

export function createSeatInformationFormConfig() {
  return <ISeatInformationFormConfig>{
    class: new DropDownField({
      label: 'Class',
      initialValue: '',
      required: true,
      name: 'class',
      placeHolder: 'Select a Class',
      onChange: (value) =>
        dataService.dispatch({ type: 'CLASS-CHANGED', payload: value }),
      dataConfig: {
        keyColumn: 'code',
        valueColumn: 'name',
        dataSource: dataService.getClasses(),
      },
    }),
    wagon: new DropDownField({
      label: 'Wagon',
      initialValue: '',
      required: true,
      name: 'wagon',
      placeHolder: 'Select a Wagon',
      onChange: (value) =>
        dataService.dispatch({ type: 'WAGON-CHANGED', payload: value }),
      dataConfig: {
        keyColumn: 'code',
        valueColumn: 'name',
        dataSource: dataService.wagons$,
      },
    }),
    seat: new DropDownField({
      label: 'Seat',
      initialValue: '',
      required: true,
      name: 'seat',
      placeHolder: 'Select a Seat',
      dataConfig: {
        keyColumn: 'key',
        valueColumn: 'value',
        dataSource: dataService.seats$,
      },
    }),
  };
}

export function createPaymentInformationFormConfig() {
  return <IPaymentInformationFormConfig>{
    cardHolderName: new TextBoxField({
      label: 'Card holder name',
      required: true,
      name: 'cardHolderName',
    }),
    cvv: new TextBoxField({
      label: 'CVV',
      required: true,
      name: 'cvv',
    }),
    cardNumber: new TextBoxField({
      label: 'Card Number',
      required: true,
      name: 'cardNumber',
    }),
    expiry: new TextBoxField({
      label: 'Expiry',
      required: true,
      name: 'expiry',
    }),
  };
}

export function createBookingFormConfig() {
  return <IBookingFormConfig>{
    personalInformation: createPersonalInformationFormConfig(),
    seatInformation: createSeatInformationFormConfig(),
    paymentInformation: createPaymentInformationFormConfig(),
  };
}
