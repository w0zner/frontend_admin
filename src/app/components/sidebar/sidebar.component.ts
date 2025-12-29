import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  usuario: string = ''
  url: string = ''
  imgSelect: string = ''
  nombreTienda: string = ''
  colorTienda: string = ''

  constructor(private authService: AuthService, private router: Router, private configuracionesService: ConfiguracionesService){
    this.url = GLOBAL.url + 'config/obtenerLogo/'
    this.usuario = this.authService.getEmailLogged()
  }

  ngOnInit(): void {

      this.imgSelect = localStorage.getItem('logoTienda') || this.establecerLogo()
      this.nombreTienda = localStorage.getItem('nombreTienda') || this.establecerNombreTienda()
      this.colorTienda = localStorage.getItem('colorTienda') || this.establecerColorTienda()


  }

  establecerLogo(): string{
    this.configuracionesService.obtenerConfiguracion().subscribe((res: any) => {
      if(res.data?.logo) {
        this.imgSelect = this.url + res.data.logo;
      } else {
        this.imgSelect = 'assets/img/store-64.png'
      }
      localStorage.setItem('logoTienda', this.imgSelect)
    })
    return this.imgSelect
  }

  establecerNombreTienda(): string{
    this.configuracionesService.obtenerConfiguracion().subscribe((res: any) => {
      this.nombreTienda = res.data?.titulo || 'Tienda'
      localStorage.setItem('nombreTienda', this.nombreTienda)
    })
    return this.nombreTienda
  }

  establecerColorTienda(): string{
    this.configuracionesService.obtenerConfiguracion().subscribe((res: any) => {
      console.log(res)
      this.colorTienda = res.data?.color //|| '#3b506c'
      localStorage.setItem('colorTienda', this.colorTienda)
    })
    return this.colorTienda
  }
}
