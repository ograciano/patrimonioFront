import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

const wsUrl = environment.wsUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(formData: LoginForm) {
    return this.http.post(`${wsUrl}/auth/login`, formData)
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token_patrimonio', resp.token);
          localStorage.setItem('usuario_patrimonio', JSON.stringify(resp.usuario));
        })
      );
  }

  validarToken() {
    const token = localStorage.getItem('token_patrimonio') || '';
    return this.http.get(`${wsUrl}/auth/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token_patrimonio', resp.token);
        localStorage.setItem('usuario_patrimonio', JSON.stringify(resp.usuario));
      }),
      map((resp: any) => true),
      catchError( error => of(false))
    )
  }

  logout() {
    localStorage.removeItem('token_patrimonio');
    localStorage.removeItem('usuario_patrimonio');
  }

}
