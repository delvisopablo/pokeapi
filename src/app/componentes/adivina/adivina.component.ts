import { Component, Input, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../../modelos/pokemon.interface';
import { ConsultaserviceService } from '../../servicios/consulta-service/consultaservice.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adivina',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adivina.component.html',
  styleUrl: './adivina.component.css'
})
export class AdivinaComponent implements OnInit{
  @Input () pokemon: Pokemon = {
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

  intentos = 0;
  acertado = false;

  formuGuess : FormGroup;
  

  constructor(private consultaService: ConsultaserviceService) {
    this.consultaService = inject(ConsultaserviceService);
    this.buscarPokemonAleatorio();
    this.formuGuess = new FormGroup({
      guess: new FormControl('', Validators.required)
    });
   }

   ngOnInit(): void {
     var intentos = 0;
     var acertado = false;
     this.adivinar(this.pokemon.nombre);
   }

   

   buscarPokemonAleatorio() {
    console.log("Buscando pokemon ");
    var nPokedex = Math.floor(Math.random() * 1000) + 1;
    this.consultaService.buscarPokemon(nPokedex).subscribe({
      next: (data: any) => {
        this.pokemon = data;
        console.log(this.pokemon);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
   }

   onSubmit() { 
      var termino = this.formuGuess.controls['guess'].value;
      var intento = this.adivinar(termino);
      console.log("Intentos: " + intento);
    }

    adivinar(termino: string) {

      if (typeof termino !== 'string') {
        console.error('termino debe ser una cadena');
        return;
      }

      var acertado = false;
      console.log("Adivinando pokemon");
      
        if (termino.toLowerCase() === this.pokemon.nombre.toLowerCase()) {
        console.log("Has acertado");
        acertado = true;
      }else{
        console.log("Has fallado");
        this.intentos++;
      }
      
      return this.intentos;
    }


}
