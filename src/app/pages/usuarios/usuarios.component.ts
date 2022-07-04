import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';
import { ModalService } from '../../services/modal-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde,5)
      .subscribe( ({total, usuarios}) => {
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.totalUsuarios = total;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if(termino.length == 0) {
      this.usuarios = this.usuariosTemp;
      return
    }
    this.busquedaService.busqueda('usuarios', termino)
        .subscribe((resp: Usuario[]) => this.usuarios = resp)
  }

  bloquearUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    } else {
      Swal.fire({
        title: 'Estas Seguro?',
        text: "No se podra revertir este proceso!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borralo'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.bloquearUsuario(usuario.uid).subscribe( { next: (resp: any) => {
            Swal.fire(
              'Borrado!',
              resp.message,
              'success'
            )
            this.cargarUsuarios();
          }, error: err => {
            console.log(err);
            Swal.fire('Error en el Sistema', err.error.message, 'error');
          }});

        }
      })
    }
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalService.abrirModal(usuario);
  }


}
