import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatListModule} from "@angular/material/list";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DialogModule} from '@angular/cdk/dialog';
import {MatCardModule} from "@angular/material/card";
import {FormDialogModule} from "./form-dialog/form-dialog.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatListModule,
    DragDropModule,
    DialogModule,
    FormsModule,
    MatCardModule,
    FormDialogModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
