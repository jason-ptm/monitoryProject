import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { ClassRoomService } from 'src/app/services/class-room.service';
import { DataService } from 'src/app/services/data.service';

declare var $: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  private tempElement!: HTMLElement;

  @ViewChild('celdInfo')
  public celdInfo!: SwalComponent

  constructor(
    public _classRoomService: ClassRoomService,
    public dataService: DataService,
    public readonly swalTargets: SwalPortalTargets
  ) { }

  ngOnInit(): void {
    this._classRoomService.clearClassCalendar()
    this._classRoomService.getClassRooms()
  }

  showCeldInfo(x: number, y: number) {
    if(this._classRoomService.selectedClassRoom?.calendar[x][y].selected){
      this._classRoomService.setSelectedCeld(x,y)
      this.celdInfo.fire();
    }
  }

  selectClass(element: HTMLElement, classRoom: Object) {
    let tempDetails = this.tempElement?.querySelector('.details')
    let elementDetails = element.querySelector('.details')
    if (this.tempElement == element) {
      element.querySelector('.icon')?.classList.toggle('active')
      elementDetails?.classList.toggle('active')
    }
    else if (this.tempElement != undefined) {
      this.tempElement.classList.remove('active');
      this.tempElement.querySelector('.icon')?.classList.remove('active')
      tempDetails?.classList.remove('active')

      element.classList.add('active');
      element.querySelector('.icon')?.classList.add('active')
      elementDetails?.classList.add('active')
      this.tempElement = element;
    }
    else {
      element.classList.add('active');
      element.querySelector('.icon')?.classList.add('active')
      elementDetails?.classList.add('active')
      this.tempElement = element;
    }
    this._classRoomService.setSelectedClassRoom(classRoom);
  }

  deleteClassRoom(){
    console.log(1)
  }
}
