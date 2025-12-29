import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(
    private authService: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }

}
