import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoStreamService {
  private _estadoBoton: number = 0;

  get estadoBoton(): number {
    return this._estadoBoton;
  }

  set estadoBoton(valor: number) {
    this._estadoBoton = valor;
  }
}
