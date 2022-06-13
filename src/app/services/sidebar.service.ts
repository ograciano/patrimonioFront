import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {titulo: 'Accesos',
    icono: 'mdi mdi-gauge',
    submenus: [
      {titulo: 'Main', url: '/'},
      {titulo: 'ProgressBar', url: 'progress'},
      {titulo: 'Graficas', url: 'grafica1'},
    ]
  }
  ]

  constructor() { }
}
