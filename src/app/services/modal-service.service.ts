import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;
  private usuario: Usuario = new Usuario();
  get getUsuario(): Usuario{
    return this.usuario;
  }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(usuario: Usuario) {
    this.usuario = new Usuario(
      usuario.nombre,
      usuario.apellido_paterno,
      usuario.apellido_materno,
      usuario.cargo,
      usuario.email,
      usuario.role,
      '',
      usuario.estado,
      usuario.online,
      usuario.uid);
    this._ocultarModal = false;
    return this.usuario;

  }
  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
