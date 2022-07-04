import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const wsUrl = environment.wsUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario | undefined;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token_patrimonio') || '';
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

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
    return this.http.get(`${wsUrl}/auth/login/renew`,this.headers)
      .pipe(
        tap((resp: any) => {
          const {nombre,apellido_paterno,apellido_materno,cargo,email,role,password,estado,online,uid} = resp.usuario;
          this.usuario = new Usuario(nombre,apellido_paterno,apellido_materno,cargo,email,role,password,estado,online,uid);
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

  cargarUsuarios(desde: number, limite: number) {
    return this.http.get<CargarUsuario>(`${wsUrl}/usuarios/?desde=${desde}&limite=${limite}`, this.headers)
      .pipe(
        map( resp => {
          const usuarios = resp.usuarios.map( user =>
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
          return {
            total: resp.total,
            usuarios
          }
        })
      );
  }

  bloquearUsuario(uid: string | undefined) {
    const url = `${wsUrl}/usuarios/${uid}`
    return this.http.delete(url, this.headers);
  }

}
