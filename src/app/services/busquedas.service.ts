import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private wsUrl = environment.wsUrl;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token_patrimonio') || '';
  }

  get headers () {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transormarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(user =>
      new Usuario(user.nombre,
        user.apellido_paterno,
        user.apellido_materno,
        user.cargo,
        user.email,
        user.role,
        '',
        user.estado,
        user.online,
        user.uid));
  }

  busqueda(tabla: 'usuarios' | 'patrimonios' | 'areas', termino: string) {
    const url = `${this.wsUrl}/buscar/${tabla}/${termino}?desde=0&limite=5`;
    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map((resp: any) => {
                switch (tabla) {
                  case 'usuarios':
                    return this.transormarUsuarios(resp.results)
                    break;

                  default:
                    return [];
                    break;
                }
              })
            )
  }

}
