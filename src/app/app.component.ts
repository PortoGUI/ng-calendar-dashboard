import {Component, EventEmitter, OnInit} from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import {FormDialog} from "./form-dialog/form-dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-root',
  template: `
    <div id="calendar-custom">
      <div class="row h-100">
        <div class="col-md-2 pt-3">
          <mat-card class="demo-inline-calendar-card">
            <mat-calendar [(selected)]="date"></mat-calendar>
          </mat-card>
        </div>
        <div class="col-md-10 p-3 pt-0">
          <div id="scrolling-area" class="p-3">
            <div class="row">
              <ng-container *ngFor="let item of times">
                <div class="content-time col-1 d-flex justify-content-center align-items-center">
                  <b><i class="far fa-clock me-2"></i>{{item.description}}</b>
                </div>
                <div class="content-drag-zone col-11 p-2">
                  <div cdkDropList cdkDropListOrientation="horizontal" [cdkDropListConnectedTo]="connectedList()"
                       [cdkDropListData]="item.dataSource" [id]="item.id"
                       class="d-flex h-100" (cdkDropListDropped)="drop($event, item.description)">
                    <div class="example-box mx-1" *ngFor="let timePeriod of item.dataSource"
                         [style.background-color]="timePeriod.color" cdkDrag [cdkDragData]="timePeriod">
                      <div class="d-flex justify-content-between align-items-center h-100">
                        <div class="ps-2 text-truncate">
                          <b class="p-0 m-0">{{formatDate(timePeriod.date)}}
                            | {{timePeriod.text}}</b>
                        </div>
                        <div class="d-flex justify-content-between align-items-center me-2">
                          <button style="height: 20px; width: 20px" mat-icon-button title="Edit"
                                  (click)="addEdit(timePeriod.id, item.id)"
                                  class="d-flex justify-content-center align-items-center" color="primary">
                            <i style="font-size: 12px;" class="fa-solid fa-pen"></i>
                          </button>
                          <button style="height: 20px; width: 20px" mat-icon-button
                                  class="d-flex justify-content-center align-items-center" color="warn" title="Delete"
                                  (click)="delete(item.dataSource, timePeriod.id)">
                            <i style="font-size: 12px;" class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
      <div id="button-area">
        <button mat-mini-fab color="primary" aria-label="Example icon button with a delete icon"
                (click)="addEdit()">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  times: Array<ITime> = new Array<ITime>()

  date: Date = new Date()

  closeForm: EventEmitter<any> = new EventEmitter<any>()

  constructor(public dialog: Dialog) {
    this.times = [
      {id: '1', description: '01:00', dataSource: new Array<ICard>},
      {id: '2', description: '02:00', dataSource: [{id:1, text: 'TESTE', date: new Date(), color: '#fff'}]},
      {id: '3', description: '03:00', dataSource: new Array<ICard>},
      {id: '4', description: '04:00', dataSource: new Array<ICard>},
      {id: '5', description: '05:00', dataSource: new Array<ICard>},
      {id: '6', description: '06:00', dataSource: new Array<ICard>},
      {id: '7', description: '07:00', dataSource: new Array<ICard>},
      {id: '8', description: '08:00', dataSource: new Array<ICard>},
      {id: '9', description: '09:00', dataSource: new Array<ICard>},
      {id: '10', description: '10:00', dataSource: new Array<ICard>},
      {id: '11', description: '11:00', dataSource: new Array<ICard>},
      {id: '12', description: '12:00', dataSource: new Array<ICard>},
      {id: '13', description: '13:00', dataSource: new Array<ICard>},
      {id: '14', description: '14:00', dataSource: new Array<ICard>},
      {id: '15', description: '15:00', dataSource: new Array<ICard>},
      {id: '16', description: '16:00', dataSource: new Array<ICard>},
      {id: '17', description: '17:00', dataSource: new Array<ICard>},
      {id: '18', description: '18:00', dataSource: new Array<ICard>},
      {id: '19', description: '19:00', dataSource: new Array<ICard>},
      {id: '20', description: '20:00', dataSource: new Array<ICard>},
      {id: '21', description: '21:00', dataSource: new Array<ICard>},
      {id: '22', description: '22:00', dataSource: new Array<ICard>},
      {id: '23', description: '23:00', dataSource: new Array<ICard>},
      {id: '24', description: '00:00', dataSource: new Array<ICard>},
    ]
  }

  ngOnInit() {
    this.closeForm.subscribe(value => {
      if (value.form) {
        this.dialog.closeAll()
        if (value.id) {
          const time = this.times.find((item) => item.id === value.id)
          if (time) {
            const findItem: any = time.dataSource.find(item => item.id === value.form.controls.id.value);
            findItem.date = value.form.controls.date.value
            findItem.text = value.form.controls.description.value
          }
        } else {
          this.times[0].dataSource.push({
            id: this.times[0].dataSource.length + 1,
            text: value.form.controls.description.value,
            color: '#fff',
            date: value.form.controls.date.value
          })
        }
      }
    })
  }

  drop(event: CdkDragDrop<Array<ICard>, any>, descr: string) {
    console.log(descr);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex,);
    }
    // alert(descr)
    // moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }

  delete(data: Array<ICard>, id: number) {
    const index = data.findIndex((item: any) => item.id === id)
    if (index !== -1) {
      data.splice(index, 1)
    }
  }

  addEdit(id?: number, timesId?: string): void {
    let data: {}
    if (id) {
      const time = this.times.find((item) => item.id === timesId)
      let editValues: any
      if (time) {
        editValues = time.dataSource.find(item => item.id === id)
        editValues.father = timesId
      }
      data = {closeEvent: this.closeForm, actualDate: this.date, editValues}
    } else {
      data = {closeEvent: this.closeForm, actualDate: this.date}
    }
    this.dialog.open<string>(FormDialog, {data});
  }

  formatDate(date: Date): string {
    if (date) {
      return String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    } else {
      return ''
    }
  }

  connectedList(): Array<string> {
    return this.times.map(i => i.id)
  }
}

export interface ITime {
  id: string
  description: string
  dataSource: Array<ICard>
}

export interface ICard {
  id: number
  text: string
  color: string
  date: Date
}
