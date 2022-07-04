import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class FileUploadService {

  private wsUrl = environment.wsUrl;

  constructor() { }

  async subirFoto(archivo: File, lugar: 'etiqueta' | 'ubicacion', id: string) {
    try {
      const url = `${this.wsUrl}/upload/${lugar}/patrimonios/${id}`;
      const formData = new FormData();
      formData.append('archivo',archivo);
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token_patrimonio') || ''
        },
        body: formData
      });

      console.log(resp);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
