import { Pokemon } from './../../../../modelos/pokemon';
import { Component, inject, OnInit, Input } from '@angular/core';
import { ConsultaserviceService } from '../../../servicios/consulta-service/consultaservice.service';
import { style } from '@angular/animations';
import { PokemonComponent } from '../../pokemon/pokemon.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [PokemonComponent, RouterLink],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

@Input() Pokemon: Pokemon | undefined;

// private consultaService = inject ( ConsultaserviceService);

pokemon: Pokemon | undefined;

esShiny: boolean = false;
currentImage: string = '';
  


    constructor(private consultaService: ConsultaserviceService) {
      // this.consultaService = inject(ConsultaserviceService);

      this.buscarPokemonAleatorio();
     }

    ngOnInit() {
      console.log("Buscando pokemon aleatorio");
      this.buscarPokemonAleatorio();
     }

    buscarPokemonAleatorio() {
      this.esShiny = false;
      console.log("Buscando pokemon ");
      var nPokedex = Math.floor(Math.random() * 1000) + 1;
      this.consultaService.buscarPokemon(nPokedex).subscribe({
        next: (data: any) => {
          this.esShiny = false;
          this.pokemon = data;
          if(this.pokemon?.id === undefined){
            console.log('No se encontró el pokemon');
          }else{
            console.log("Numero de pokemon = " + this.pokemon.id);
            this.pokemon.generacion = this.calcularGeneracion(this.pokemon.id);
            this.esShiny = false;

            console.log(this.pokemon.name);
          }

          
          console.log(this.pokemon);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
      
     }


     cambiarPokemon(cambio: number) {
      this.esShiny = false;
      if (this.pokemon == undefined) {
        return;
      }else{
        const newId = this.pokemon.id + cambio;
        
        this.consultaService.buscarPokemon(newId).subscribe({
          next: (data: any) => {
            
            this.pokemon = data;
            
            console.log(this.pokemon);
          },
          error: (error: any) => {
            console.error(error);
          }
        });
        console.log("Buscando pokemon con id: " + newId);
      }

      
    }

    calcularGeneracion(nPokedex: number){
      if (nPokedex <= 151) {
        return 'Primera';
      }else if (nPokedex <= 251) {
        return 'Segunda';
      }else if (nPokedex <= 386) {
        return 'Tercera';
      }else if (nPokedex <= 493) {  
        return 'Cuarta';
      }else if (nPokedex <= 649) {  
        return 'Quinta';
      } else if (nPokedex <= 721) {
        return 'Sexta';
      }else if (nPokedex <= 809) {
        return 'Séptima';
      } else if (nPokedex <= 898){
        return 'Octava';
      } else {  
        return 'Novena';
      }
    }


    

    }
  


