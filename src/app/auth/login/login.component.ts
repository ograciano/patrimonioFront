import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ErrorValidator } from '../../interfaces/errors.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ['oscaromar.graciano@durango.gob.mx', [Validators.required, Validators.email]],
    password: ['123456789', Validators.required]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  login() {
    let mensaje: string = '';
    this.usuarioService.login(this.loginForm.value)
      .subscribe({next: resp => {
        this.router.navigateByUrl('/');
      }, error: err => {
        if(err.error.errors){
          err.error.errors.forEach((e: ErrorValidator) => {
            mensaje += `${e.msg} <br/><br/>`
          });
          Swal.fire('Error', mensaje, 'error');
        } else {
          Swal.fire('Error', err.error.msg, 'error');
        }
      }
    });
  }

}
