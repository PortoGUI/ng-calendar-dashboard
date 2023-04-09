import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent, CdkDialogDataExampleDialog} from './app.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatListModule} from "@angular/material/list";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DialogModule} from '@angular/cdk/dialog';

@NgModule({
  declarations: [
    AppComponent,
    CdkDialogDataExampleDialog,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatListModule,
    DragDropModule,
    DialogModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
