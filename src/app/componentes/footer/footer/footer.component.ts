import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  private router: Router;
  constructor(){
    this.router = inject(Router)
  }

  nombre: string = 'Pablo del Viso';
  universidad: string = 'Universidad Pontificia de Salamanca';
  asignatura: string = 'Servicios y Plataformas Web';
}
