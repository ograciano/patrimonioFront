import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    ModalUsuarioComponent
  ],
  exports: [
    IncrementadorComponent,
    ModalUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
