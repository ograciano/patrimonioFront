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
  },

    {titulo: 'Administrador',
      icono: 'mdi mdi-account-multiple',
      submenus: [
        {titulo: 'Usuarios del Sistema', url: 'usuarios'},
      ]
    },

    {titulo: 'Patrimonio',
      icono: 'mdi mdi-folder-lock-open',
      submenus: [
        {titulo: 'Patrimonios', url: 'patrimonios'},
        {titulo: 'Areas', url: 'areas'},
      ]
    },
  ]

  constructor() { }
}
