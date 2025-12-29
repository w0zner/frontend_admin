import { Component, OnInit } from '@angular/core';
import { ConfiguracionesService } from './services/configuraciones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'frontend_admin';
  colorTienda: string = '#3b506c';

  constructor(private configuracionesService: ConfiguracionesService) {}

  ngOnInit(): void {
      this.colorTienda = localStorage.getItem('colorTienda') || this.establecerColorTienda()
  }

  establecerColorTienda(): string{
    this.configuracionesService.obtenerConfiguracion().subscribe((res: any) => {
      console.log(res)
      this.colorTienda = res.data?.color || '#3b506c';
      localStorage.setItem('colorTienda', this.colorTienda)
    })
    return this.colorTienda
  }
}
