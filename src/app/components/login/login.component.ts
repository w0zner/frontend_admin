import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
declare const iziToast: any ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  login() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value)
    } else {
      iziToast.show({
        title: 'Error',
        message: 'Faltan datos por completar',
        //class: 'text-danger',
        color: 'red',
        position: 'topRight'
      })
    }
  }

}
