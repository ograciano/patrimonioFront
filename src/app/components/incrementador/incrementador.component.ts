import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor(n:number){
    if (this.progreso >= 100 && n >= 0) {
      this.valorSalida.emit(100);
      this.progreso = 100;
    }

    if (this.progreso <= 0 && n < 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
    }

    this.progreso = this.progreso + n;
    this.valorSalida.emit(this.progreso);

  }
}
