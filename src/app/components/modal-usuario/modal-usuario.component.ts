import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal-service.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styles: [
  ]
})
export class ModalUsuarioComponent implements OnInit{

  private usuarioModal: Usuario = new Usuario();

  public formSubmitted = false;

  public usuarioForm = this.fb.group({
    nombre: [this.modalService.getUsuario.nombre],
    apellido_paterno: [this.modalService.getUsuario.apellido_paterno, Validators.required]
  });


  constructor(public modalService: ModalService, private fb: FormBuilder) { }
  ngOnInit(): void {
      this.usuarioModal.nombre = this.modalService.getUsuario.nombre;
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  submit() {
    console.log(this.usuarioModal);
    console.log(this.modalService.getUsuario);
    console.log(this.modalService.getUsuario.nombre);
    console.log(this.modalService.getUsuario.apellido_materno);
  }

}
