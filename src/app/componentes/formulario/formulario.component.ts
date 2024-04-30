import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { Pokemon } from '../../../modelos/pokemon.interface';

import { ConsultaserviceService } from '../../servicios/consulta-service/consultaservice.service';
import { Cons } from 'rxjs';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, PokemonComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

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

  formularioEnviado: boolean = false;

  formulario: FormGroup;

  resultado: number = 0;
  final: any;

  // listaPokemon: Pokemon = {
  //   nombre: '',
  //   habilidad: '',
  //   nPokedex: 1,
  //   tipo: '',
  //   tipo2: '',
  //   generacion: '',
  //   juego: '',
  //   fotoDel: '',
  //   fotoShiny: '',
  //   url: '',
  //   descripcion: ''
  // };

  cargando: boolean = false;


  constructor(private consultaService: ConsultaserviceService) {
    this.formulario = new FormGroup({
      edad: new FormControl('', Validators.required),
      gustos: new FormControl('', Validators.required),
      pelicula: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      habitat: new FormControl('', Validators.required),
      enviado: new FormControl(false, Validators.required)
    });

    this.consultaService = inject(ConsultaserviceService);
    this.consultaService.buscarPokemon(this.final);
  }

  onSubmit() {
    this.formularioEnviado = true;
    this.formulario.controls['enviado'].setValue(true);
    console.log("formulario enviado");
    var nPokedex = this.calcularPokemon();

    this.getDatos(nPokedex);
    
  }


  calcularPokemon(): number{
    const edad = this.formulario.controls['edad'].value;
    const gustos = this.formulario.controls['gustos'].value;
    const pelicula = this.formulario.controls['pelicula'].value;
    const tipo = this.formulario.controls['tipo'].value;
    const habitat = this.formulario.controls['habitat'].value;
    const enviado = this.formulario.controls['enviado'].value;

    if (edad && gustos && pelicula && tipo && pelicula && enviado) {
      this.calcularGeneracion(edad);
    console.log("generacion = " + this.calcularGeneracion(edad));
      var resultado = this.calcularGustos(gustos);
      resultado *= this.calcularPelicula(pelicula);
      resultado -= this.calcularTipo(tipo);
      resultado += this.calcularHabitat(habitat);

      
      console.log("Resultado: " + resultado);
      var final = this.calcularNPokemon(this.calcularGeneracion(edad), resultado);
      
      console.log("Resultado: " + final);
      console.log("Datos completos");
    
      return final;

    } else {
      console.log("Faltan datos");
      return 0;
    }
  }

  getDatos(termino: any) {
    this.cargando = true;
    this.consultaService.buscarPokemon(termino).subscribe({
      next: (data: any) => {
        this.pokemon = data;
        this.cargando = false;
        console.log(this.pokemon);
      }, 
      error: (error: any) => {
        console.error(error);
        this.cargando = false;
      }
      })
    }


  calcularNPokemon(generacion: number, resultado: number){
    switch (generacion) {
      case 1:
        return 0 + resultado;
      case 2:
        return 151 + resultado;
      case 3:
        return 251 + resultado;
      case 4:
        return 386 + resultado;
      case 5:
        return 493 + resultado;
      case 6:
        return 649 + resultado;
      case 7:
        return 721 + resultado;
      case 8:
        return 809 + resultado; 
      case 9:
        return 898 - resultado;  
      default:
        return resultado; 
    }
  }

  calcularGeneracion(edad: number){
    
    const year = new Date().getFullYear();
    const releaseYear = 1996;
    const maxEdadPrimeraGen = 45;
    const birthYear = year - edad;
    const ageAtRelease = birthYear - releaseYear;

    if (ageAtRelease > maxEdadPrimeraGen) {
        return 1;
    } else {
        
        const generation = Math.ceil(ageAtRelease / 3);
        return Math.min(Math.max(generation, 1), 9);
        
    }
  }

  calcularGustos(gustos: string){
    if (gustos === "leer") {
      return 1;
    } else if (gustos === "videojuegos") {
      return 2;
    } else if (gustos === "deporte") {
      return 3;
    }  else if (gustos === "caminar") {
      return 4;
    } else if (gustos === "cocinar") {
      return 5;
    } else if (gustos === "musica") {
      return 6;
    } else if (gustos === "pintar") {
      return 7;
    } else if (gustos === "viajar") {
      return 8;
    } else if (gustos === "naturaleza") {
      return 9;
    } else {
      return 10;
    }
  }

  calcularPelicula(pelicula: string){
    if (pelicula === "aventura") {
      return 1;
    } else if (pelicula === "comedia") {
      return 2;
    } else if (pelicula === "drama") {
      return 3;
    }  else if (pelicula === "terror") {
      return 4;
    } else if (pelicula === "accion") {
      return 5;
    } else if (pelicula === "romance") {
      return 6;
    } else if (pelicula === "ciencia_ficcion") {
      return 7;
    } else if (pelicula === "documental") {
      return 8;
    } else if (pelicula === "animacion") {
      return 9;
    } else {
      return 10;
    }
  }

  calcularTipo(tipo: string) {
    switch (tipo) {
      case "fuego":
        return 1;
      case "agua":
        return 2;
      case "planta":
        return 3;
      case "electrico":
        return 4;
      case "psiquico":
        return 5;
      case "hada":
        return 6;
      case "hielo":
        return 7;
      case "lucha":
        return 8;
      case "volador":
        return 9;
      default:
        return 10;
    }
  }
  
  calcularHabitat(habitat: string){
    if (habitat === "bosque") {
      return 1;
    } else if (habitat === "mar") {
      return 2;
    } else if (habitat === "montana") {
      return 3;
    }  else if (habitat === "ciudad") {
      return 4;
    } else if (habitat === "campo") {
      return 5;
    } else if (habitat === "desierto") {
      return 6;
    } else if (habitat === "cueva") {
      return 7;
    } else if (habitat === "volcan") {
      return 8;
    } else if (habitat === "ezpacio") {
      return 9;
    } else {
      return 10;
    }
  }




}
