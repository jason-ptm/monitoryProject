import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { AssistantService } from 'src/app/services/assistant.service';
import { ClassRoomService } from 'src/app/services/class-room.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public assistantForm!: FormGroup;
  public assistantSiteForm!: FormGroup;

  @ViewChild('assistantSite')
  public assistantSite!: SwalComponent

  constructor(
    public assistantService: AssistantService,
    public classRoomService: ClassRoomService,
    public dataService: DataService,
    private fb: FormBuilder,
    public readonly swalTargets: SwalPortalTargets
  ) { }

  ngOnInit(): void {
    this.assistantForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(30), Validators.minLength(5)]
      ],
      code: [
        '',
        [Validators.required, Validators.maxLength(11), Validators.minLength(11)]
      ],
      class: [
        '',
        [Validators.required]
      ]
    })

    this.assistantSiteForm = this.fb.group({
      typeRoom: [
        '',
        [Validators.required]
      ]
    })

    this.classRoomService.clearClassCalendar()
    this.classRoomService.clearAssistantCalendar()

    this.classRoomService.getClassRooms()
  }

  addAssistant(): void {
    if(this.validateForm()){
      this.classRoomService.addAssistant(this.assistantForm.value).subscribe(
        data => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Clase agregada!',
            showConfirmButton: false,
            timer: 2000
          });
          this.classRoomService.clearAssistantCalendar()
          this.classRoomService.clearClassCalendar()
          this.clearForm();
          this.classRoomService.getClassRooms()
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

  resaltCeld(x: number, y: number): void {
    
    if(!this.classRoomService.calendarAssistant[x][y].selected){
      this.assistantSite.fire().then(res => {
        if (res.isConfirmed) {
          this.classRoomService.setAssistantCeld(x, y, this.assistantSiteForm.get('typeRoom')?.value)
        }
      })
    }
    else{
      Swal.fire({
        icon: 'question',
        title: 'Quieres eliminar los datos?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.classRoomService.clearCeldAssistant(x, y)
        }
      })
    }
    if (this.classRoomService.selectedClassRoom) {
      if (this.classRoomService.selectedClassRoom?.assistant?.length < 3 || !this.classRoomService.selectedClassRoom.assistant) {
        
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Número máximo de monitores excedido!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }

  validateForm(): boolean {
    if (this.assistantForm.invalid) {
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
    let calendar = this.classRoomService.calendarAssistant.filter(row => {
      let count = 0;
      row.forEach(room => {
        if (room.selected) count++;
      })
      return count > 0;
    });
    if (calendar.length > 0) return true
    return false;
  }

  changeClassFormValue(camp: string, e: any): void {
    this.assistantForm.get(camp)?.setValue(e.target.value, {
      onlySelf: true,
    })

    this.classRoomService.setSelectedClassRoomById(e.target.value)
  }

  changeAssistantSiteFormValue(camp: string, e: any): void {
    this.assistantSiteForm.get(camp)?.setValue(e.target.value, {
      onlySelf: true,
    })
  }

  clearForm(): void {
    this.assistantForm.reset()
    this.assistantSiteForm.reset()
  }
}
