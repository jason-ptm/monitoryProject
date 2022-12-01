import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassRoomService } from 'src/app/services/class-room.service';
import { DataService } from 'src/app/services/data.service';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public classRoomForm !: FormGroup
  public classRoomSiteForm !: FormGroup

  @ViewChild('roomSiteForm')
  public roomSiteForm!: SwalComponent;

  constructor(
    public _classRoomService: ClassRoomService,
    public dataService: DataService,
    private fb: FormBuilder,
    public readonly swalTargets: SwalPortalTargets) { }

  ngOnInit(): void {
    this.classRoomForm = this.fb.group({
      teachName: [
        '',
        [Validators.required, Validators.maxLength(30)]
      ],
      name: [
        '',
        [Validators.required, Validators.maxLength(30), Validators.minLength(4)]
      ]
    })

    this.classRoomSiteForm = this.fb.group({
      classRoomNumber: [
        '',
        [Validators.required, Validators.maxLength(20)]
      ],
      build: [
        '',
        [Validators.required]
      ],
      roomType: [
        '',
        [Validators.required]
      ]
    })
  }

  changeFormValue(camp: string, e: any): void {
    this.classRoomSiteForm.get(camp)?.setValue(e.target.value, {
      onlySelf: true,
    })
  }

  resaltCeld(i: number, j: number): void {
    if (!this._classRoomService.calendarClassRoom[i][j].selected) {
      this.roomSiteForm.fire().then(() => {
        if (this.classRoomSiteForm.valid) {
          this._classRoomService.selectCeld(this.classRoomSiteForm.value, i, j)
          this.classRoomSiteForm.reset()
        }
      })
    }
    else {
      Swal.fire({
        icon: 'question',
        title: 'Quieres eliminar los datos?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this._classRoomService.clearCeld(i, j)
        }
      })
    }
  }

  handlePreConfirm(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      resolve(true)
    })
  }

  addClassRoom(): void {
    let teachName = this.classRoomForm.get('teachName')?.value
    let name = this.classRoomForm.get('name')?.value
    if (this.validateForm()) {
      this._classRoomService.addClassRoom(teachName, name).subscribe(
        data => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Clase agregada!',
            showConfirmButton: false,
            timer: 2000
          });
          this._classRoomService.clearClassCalendar()
          this.clearForm();
        },
        error => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Algo salió mal!',
            showConfirmButton: false,
            timer: 2000
          })
          console.log(error)
        }
      )
    }
  }

  validateForm(): boolean {
    if (this.classRoomForm.invalid) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Ingrese datos correctos!',
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
    if (!this.validateCalendar()) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'No hay horario asignado!',
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
    return true;
  }

  validateCalendar(): boolean {
    let calendar = this._classRoomService.calendarClassRoom.filter(row => {
      let count = 0;
      row.forEach(room => {
        if (room.selected) count++;
      })
      return count > 0;
    });
    if (calendar.length > 0) return true
    return false;
  }

  clearForm(): void {
    this.classRoomForm.reset();
  }

}
