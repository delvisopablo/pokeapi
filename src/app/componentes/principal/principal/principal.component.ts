import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../../../modelos/pokemon.interface';
import { ConsultaserviceService } from '../../../servicios/consultaservice.service';
import { style } from '@angular/animations';


@Component({
  selector: 'app-principal',
  standalone: true,
  providers: [],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  prueba: number = 5;

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
  data: any;
  nPokedex:  number = Math.floor(Math.random() * 1000);
  esShiny: boolean = false;
  currentImage: string = '';
  cargando: boolean = false;


    constructor(private consultaService: ConsultaserviceService) {
     
      this.consultaService = inject(ConsultaserviceService);
      this.pokedex = this.consultaService.buscarPokemon(this.nPokedex);
      
     }

    ngOnInit() {
      this.getDatos(this.nPokedex);
      this.mayusculas(this.listaPokemon.nombre);
     }

    getDatos(termino: any) {
      this.cargando = true;
      this.consultaService.buscarPokemon(termino).subscribe({
        next: (data: any) => {
          this.listaPokemon = data;
          this.cargando = false;
          console.log(this.listaPokemon);
        }, 
        error: (error: any) => {
          console.error(error);
          this.cargando = false;
        }
        })
      }

      verShiny() {
        this.esShiny = !this.esShiny;
        this.currentImage = this.esShiny ? this.listaPokemon.fotoShiny : this.listaPokemon.fotoDel;
      }
    
      cambiarPokemon(cambio: number) {
        const newId = this.listaPokemon.nPokedex + cambio;
        this.getDatos(newId);
        this.esShiny = false;
      }

      mayusculas(value: string): string {
        if (!value) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }

      colorearTipo(tipo: string): string {
        switch (tipo) {
            case 'normal':
            return 'tipo-normal';
            case 'fire':
            return 'tipo-fuego';
            case 'water':
            return 'background-color: var(--water-color)';
            case 'electric':
            return 'background-color: var(--electric-color)';
            case 'grass':
            return 'background-color: var(--grass-color)';
            case 'ice':
            return 'background-color: var(--ice-color)';
            case 'fighting':
            return 'background-color: var(--fighting-color)';
            case 'poison':
            return 'background-color: var(--poison-color)';
            case 'ground':
            return 'background-color: var(--ground-color)';
            case 'flying':
            return 'background-color: var(--flying-color)';
            case 'psychic':
            return 'background-color: var(--psychic-color)';
            case 'bug':
            return 'background-color: var(--bug-color)';
            case 'rock':
            return 'background-color: var(--rock-color)';
            case 'ghost':
            return 'background-color: var(--ghost-color)';
            case 'dragon':
            return 'background-color: var(--dragon-color)';
            case 'dark':
            return 'background-color: var(--dark-color)';
            case 'steel':
            return 'background-color: var(--steel-color)';
            case 'fairy':
            return 'background-color: var(--fairy-color)';
            default:
            return 'background-color: var(--default-color)';
        }
      }


  }


