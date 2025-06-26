import { Component, effect, inject, Injector, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../../../modelos/pokemon';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FavoritoService } from '../../../servicios/favorito-service/favorito.service';
import { PokemonComponent } from '../../pokemon/pokemon.component';

@Component({
  selector: 'app-favorito',
  standalone: true,
  imports: [RouterLink, PokemonComponent],
  templateUrl: './favorito.component.html',
  styleUrl: './favorito.component.css'
})
export class FavoritoComponent implements OnInit{

  favoritos: any[] = [];

  constructor(private router: Router) { 

    this.favoritosService = inject(FavoritoService)
    this.itemsInCart = this.favoritosService.getFavoritos()

  }

  ngOnInit(): void {
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    
  }

  eliminarDeFavoritos(carreras: string): void {
   this.favoritos = this.favoritos.filter(carrera => carrera !== carreras);
  localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  private favoritosService;
  itemsInCart = signal<Pokemon[]>([]);
 
 
  removeItem(id:number){
    this.favoritosService.removeFromFavs(id);
  }
}
