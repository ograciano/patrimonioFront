import { environment } from '../../environments/environment';

const wsUrl = environment.wsUrl;
export class Usuario {
  constructor (
    public nombre?: string,
    public apellido_paterno?: string,
    public apellido_materno?: string,
    public cargo?: string,
    public email?: string,
    public role?: string,
    public password?: string,
    public estado?: boolean,
    public online?: boolean,
    public uid?: string,

  ) {}

  get imageUrl() {
    return `${wsUrl}/upload/no-image`;
  }

}
