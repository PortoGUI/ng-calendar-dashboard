import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

export interface DialogData {
  closeEvent: EventEmitter<any>;
  actualDate: Date,
  editValues: any
}

@Component({
  selector: 'app-form-dialog',
  template: `
    <h1>Add a Quest</h1>
    <form [formGroup]="form">
      <div class="row">
        <div class="col-12 mb-3">
          <mat-form-field appearance="fill" class="w-100">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" style="height: 200px"></textarea>
          </mat-form-field>
        </div>
        <div class="col-6">
          <mat-form-field appearance="fill" class="w-100">
            <mat-label>Select Priority</mat-label>
            <mat-select formControlName="priority">
              <mat-option class="one">
                <p class="m-0 p-0">Priority I</p>
              </mat-option>
              <mat-option class="two">
                <p class="m-0 p-0">Priority II</p>
              </mat-option>
              <mat-option class="three">
                <p class="m-0 p-0">Priority III</p>
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="col-6">
          <mat-form-field appearance="fill" class="w-100">
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" placeholder="dd/mm/yyyy" [readonly]="readOnly"
                   formControlName="date">
            <mat-datepicker-toggle matIconSuffix [for]="picker" [disabled]="readOnly"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <div class="offset-10 col-2">
          <button mat-raised-button color="primary" (click)="submit()">Submit</button>
        </div>
      </div>
    </form>
  `,
  styleUrls: ['./form-dialog.scss']
})
export class FormDialog implements OnInit {
  form: FormGroup;

  readOnly = true

  constructor(@Inject(DIALOG_DATA) public data: DialogData,
              private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      id: [null],
      description: [null],
      priority: [null],
      date: [null]
    })
  }

  ngOnInit(): void {
    if (this.data.editValues) {
      this.form.controls['description'].setValue(this.data.editValues.text)
      this.form.controls['date'].setValue(this.data.editValues.date)
      this.form.controls['id'].setValue(this.data.editValues.id)
      this.readOnly = false
    } else {
      this.form.controls['date'].setValue(this.data.actualDate)
    }
  }

  submit() {
    this.data.closeEvent.emit({form: this.form, id: this.data.editValues ? this.data.editValues.father : null})
  }
}
