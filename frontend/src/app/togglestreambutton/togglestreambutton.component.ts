import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadoStreamService} from "../services/estado-stream.service";

@Component({
  selector: 'app-togglestreambutton',
  standalone: true,
  imports: [CommonModule],
  providers: [EstadoStreamService],
  templateUrl: './togglestreambutton.component.html',
  styleUrl: './togglestreambutton.component.css'
})
export class TogglestreambuttonComponent {
  constructor(public estadoStreamService: EstadoStreamService) {}

  cambiarEstado() {
    this.estadoStreamService.estadoBoton = this.estadoStreamService.estadoBoton === 0 ? 1 : 0;
  }
  actualizar() {

  }
}

