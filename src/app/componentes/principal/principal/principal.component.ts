import { Component, inject, OnInit, Input } from '@angular/core';
import { Pokemon } from '../../../../modelos/pokemon.interface';
import { ConsultaserviceService } from '../../../servicios/consulta-service/consultaservice.service';
import { style } from '@angular/animations';
import { PokemonComponent } from '../../pokemon/pokemon.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [PokemonComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {


  @Input() pokemon: Pokemon = {
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
    pokedex: ''
};

esShiny: boolean = false;
currentImage: string = '';
  


    constructor(private consultaService: ConsultaserviceService) {
      this.consultaService = inject(ConsultaserviceService);
      this.buscarPokemonAleatorio();
     }

    // ngOnInit() {
    //   console.log("Buscando pokemon aleatorio");
    //   this.buscarPokemonAleatorio();
    //  }

    buscarPokemonAleatorio() {

      console.log("Buscando pokemon ");
      var nPokedex = Math.floor(Math.random() * 1000) + 1;
      this.consultaService.buscarPokemon(nPokedex).subscribe({
        next: (data: any) => {
          this.pokemon = data;
          this.esShiny = false;
          console.log(this.pokemon);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
      
     }


    //  cambiarPokemon(cambio: number) {
    //   const newId = this.pokemon.nPokedex + cambio;
    //   this.buscarPokemonAleatorio(newId);
    // }

    }
  


