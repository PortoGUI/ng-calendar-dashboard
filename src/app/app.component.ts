import {Component, Inject} from '@angular/core';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-root',
  template: `
      <div id="calendar-custom">
          <div class="row h-100">
              <div class="col-md-2">
                  <mat-card class="demo-inline-calendar-card">
                      <mat-calendar [(selected)]="date"></mat-calendar>
                  </mat-card>
              </div>
              <div class="col-md-10 p-3">
                  <div id="scrolling-area" class="p-3">
                      <div class="row">
                          <ng-container *ngFor="let item of times">
                              <div class="content-time col-1 d-flex justify-content-center align-items-center">{{item.description}}
                              </div>
                              <div class="content-drag-zone col-11 p-2">
                                  <div cdkDropList  #{{item.description}}="cdkDropList" [cdkDropListData]="item.dataSource"
                                       [cdkDropListConnectedTo]="buildConnections()" cdkDropListOrientation="horizontal"
                                       class="d-flex" (cdkDropListDropped)="drop($event, item.description)">
                                      <div class="example-box mx-1" *ngFor="let timePeriod of item.dataSource" cdkDrag>
                                          {{timePeriod}}
                                      </div>
                                  </div>
                              </div>
                          </ng-container>
                      </div>
                  </div>
              </div>
          </div>
          <div id="button-area">
              <button mat-fab color="primary" aria-label="Example icon button with a delete icon"
                      (click)="openDialog()">
                  <i class="fa-solid fa-plus fa-2x"></i>
              </button>
          </div>
      </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  times: Array<any> = new Array<any>()
  animal: string | undefined;

  date: Date = new Date()

  constructor(public dialog: Dialog) {
    this.times = [
      {
        id: 0, description: '01:00', dataSource: [
          'Atividade 1',
          'Atividade 2',
          'Atividade 3',
          'Atividade 4',
          'Atividade 5',
        ]
      },
      {id: 1, description: '02:00', dataSource: [
          'Atividade 6',
          'Atividade 7',
          'Atividade 8',
          'Atividade 9',
          'Atividade 10',
        ]},
      {id: 2, description: '03:00', dataSource: new Array<any>},
      {id: 3, description: '04:00', dataSource: new Array<any>},
      {id: 4, description: '05:00', dataSource: new Array<any>},
      {id: 5, description: '06:00', dataSource: new Array<any>},
      {id: 6, description: '07:00', dataSource: new Array<any>},
      {id: 7, description: '08:00', dataSource: new Array<any>},
      {id: 8, description: '09:00', dataSource: new Array<any>},
      {id: 9, description: '10:00', dataSource: new Array<any>},
      {id: 10, description: '11:00', dataSource: new Array<any>},
      {id: 11, description: '12:00', dataSource: new Array<any>},
      {id: 12, description: '13:00', dataSource: new Array<any>},
      {id: 13, description: '14:00', dataSource: new Array<any>},
      {id: 14, description: '15:00', dataSource: new Array<any>},
      {id: 15, description: '16:00', dataSource: new Array<any>},
      {id: 16, description: '17:00', dataSource: new Array<any>},
      {id: 17, description: '18:00', dataSource: new Array<any>},
      {id: 18, description: '19:00', dataSource: new Array<any>},
      {id: 19, description: '20:00', dataSource: new Array<any>},
      {id: 20, description: '21:00', dataSource: new Array<any>},
      {id: 21, description: '22:00', dataSource: new Array<any>},
      {id: 22, description: '23:00', dataSource: new Array<any>},
      {id: 23, description: '00:00', dataSource: new Array<any>},
    ]
  }

  drop(event: CdkDragDrop<string[]>, descr: string) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex,);
    }
    // alert(descr)
    // moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(CdkDialogDataExampleDialog, {
      width: '300px',
      data: {animal: this.animal},
    });

    dialogRef.closed.subscribe((result) => this.animal = result);
  }

  buildConnections(): Array<string> {
    return this.times.map(item => item.description);
  }
}

@Component({
  selector: 'cdk-dialog-data-example-dialog',
  templateUrl: 'form-dialog.html',
  styleUrls: ['./form-dialog.scss'],
})
export class CdkDialogDataExampleDialog {
  constructor(@Inject(DIALOG_DATA) public data: DialogData) {
  }
}
