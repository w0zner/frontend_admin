import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare const iziToast: any ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private token: any

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.token = this,authService.getToken()
    this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if(this.token){
      console.log('token'+ this.token)
      this.router.navigateByUrl('/')
    }
  }

  login() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.authService.loginAdmin(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigateByUrl('/')
        },
        error: (err) => {
          if(err?.status==0) {
            iziToast.show({
              title: 'Error',
              message: 'No hay respuesta del servidor',
              color: 'red',
              position: 'topRight'
            })
          } else {
            console.log(err)
            iziToast.show({
              title: 'Error',
              message: err.error.message,
              color: 'red',
              position: 'topRight'
            })
          }
        }
      })
    } else {
      iziToast.show({
        title: 'Error',
        message: 'Hay datos no válidos o vacios',
        color: 'red',
        position: 'topRight'
      })
    }
  }

}
