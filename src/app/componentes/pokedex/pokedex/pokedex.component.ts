import { Component, inject, OnInit } from '@angular/core';
import { ConsultaserviceService } from '../../../servicios/consultaservice.service';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../../../modelos/pokemon.interface';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  
  listaPokemon: Pokemon = {
    nombre: '',
    habilidad: '',
    nPokedex: 1,
    tipo: '',
    tipo2: '',
    generacion: '',
    juego: '',
    fotoDel: '',
    fotoShiny: '',
    url: '',
    descripcion: ''
  };

  pokedex: any;
  pokemons: any = [];
  data: any;
  nombrePkmn: any = 'pikachu';
  
    constructor(private consultaService: ConsultaserviceService) {
     
      this.consultaService = inject(ConsultaserviceService);
      this.pokedex = this.consultaService.buscarTodosPokemon();
      
     }

    ngOnInit() {
      this.getDatos();
     }

    getDatos() {
      this.consultaService.buscarTodosPokemon().subscribe({
        next: (data: any) => {
          this.listaPokemon = data;
          console.log(this.listaPokemon);
        }, 
        error: (error: any) => {
          console.error(error);
        }
        })
      }

      getPokemon(nombrePkmn: string) {
        this.consultaService.buscarPokemon(nombrePkmn).subscribe({
          next: (data: any) => {
            this.listaPokemon = data;
            console.log(this.listaPokemon);
          }, 
          error: (error: any) => {
            console.error(error);
          }
          })
  }

  prev(){
    this.pokedex = this.consultaService.buscarTodosPokemon();
  }

}
