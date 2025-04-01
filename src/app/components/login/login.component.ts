import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
//declare const iziToast: any ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private token: any

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificacionService: NotificacionService) {
    this.token = this,authService.getToken()
    this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if(this.token){
      this.router.navigateByUrl('/')
    }
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.loginAdmin(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response)
          this.notificacionService.notificarExito('Bienvenido!', 'bottomRight')
          this.router.navigateByUrl('/')
        },
        error: (err) => {
          this.notificacionService.notificarError(err)
        }
      })
    } else {
      this.notificacionService.notificarError(null, 'Hay datos no válidos o vacios')
    }
  }

}
