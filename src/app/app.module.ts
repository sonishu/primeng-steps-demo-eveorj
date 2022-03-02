import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';

import { PanelModule } from 'primeng/panel';
import { BookingComponent } from './booking/booking.component';
import { PersonalComponent } from './booking/personal/personal.component';
import { SeatComponent } from './booking/seat/seat.component';
import { PaymentComponent } from './booking/payment/payment.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StepsModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    RadioButtonModule,
    ReactiveFormsModule,
    PanelModule,

    RouterModule.forRoot([{ path: '', component: AppComponent }]),
  ],
  declarations: [
    AppComponent,
    PersonalComponent,
    FormGeneratorComponent,
    SeatComponent,
    BookingComponent,
    PaymentComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
