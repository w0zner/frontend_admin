import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CuponService } from 'src/app/services/cupon.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-cupon-form',
  templateUrl: './cupon-form.component.html',
  styleUrls: ['./cupon-form.component.css']
})
export class CuponFormComponent implements OnInit {

  cuponesForm: FormGroup
  id:any= null

  constructor(private fb:FormBuilder, private cuponService: CuponService, private notificacionService: NotificacionService, private route: ActivatedRoute, private router: Router) {
    this.cuponesForm = this.fb.group({
      codigo: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      limite: ['', [Validators.required]],
      createdAt: [''],
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.id = params.get('id')
        this.cuponService.obtenerPorId(this.id).subscribe({
          next: (response:any) => {
            this.cuponesForm.patchValue({
              codigo: response.data.codigo,
              tipo:  response.data.tipo,
              valor: response.data.valor,
              limite: response.data.limite,
              createdAt: moment(response.data.createdAt).format('YYYY-MM-DD')
            })
          }
        })
      }
    })
  }

  registrar() {
    console.log(this.cuponesForm.value)
    if(this.cuponesForm.valid){
      if(this.id != null) {
        this.cuponService.actualizar(this.id, this.cuponesForm.value).subscribe({
          next: (resp: any) => {
            this.notificacionService.notificarExito('Cupón actualizado exitosamente')
            this.router.navigateByUrl('/panel/cupones')
          },
          error: err =>  this.notificacionService.notificarError(err)
        })
      } else {
        this.cuponService.guardar(this.cuponesForm.value).subscribe({
          next: (resp: any)=> {
            this.notificacionService.notificarExito('Cupón actualizado exitosamente')
            this.router.navigateByUrl('/panel/cupones')
          },
          error: err =>  this.notificacionService.notificarError(err)
        })
      }
    }
  }

}
