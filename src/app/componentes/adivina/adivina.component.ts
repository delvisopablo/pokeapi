import { RouterLink } from '@angular/router';
import { Component, Input, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../../../modelos/pokemon';
import { ConsultaserviceService } from '../../servicios/consulta-service/consultaservice.service';
import { RankingService } from '../../servicios/ranking-service/ranking.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MayusPipePipe } from '../../../modelos/pipes/mayusPipe.pipe';
import { Observable } from 'rxjs';
import { apiResponse } from '../../../modelos/apiResponse';

@Component({
  selector: 'app-adivina',
  standalone: true,
  imports: [ReactiveFormsModule, MayusPipePipe],
  templateUrl: './adivina.component.html',
  styleUrl: './adivina.component.css'
})
export class AdivinaComponent implements OnInit{

  private consultaService = inject ( ConsultaserviceService );

  ranking: any;

  availableIds = Array.from({ length: 100 }, (_, i) => i + 1);
  

  nombreUsuario: string = '';
  aciertosTotales: number = 0;
  racha = 0;
  rachaMaxima = 0;
  vidas = 2;
  intentosTotales = 0;
  puntuacion = 0;
  modoFacil: boolean = false;

  modo: number = 1000;



  pokeGuess: Pokemon | undefined;
  
  intentos = 0;
  acertado: boolean = false;
  mostrarResultado = false;

  formuGuess : FormGroup;
  formuNombre : FormGroup;
  

  constructor(private rankingService: RankingService, private router: Router) {
    this.formuGuess = new FormGroup({
          guess: new FormControl('', Validators.required)
          });
     this.formuNombre = new FormGroup({
          nombre: new FormControl('', Validators.required)
          });     

    //  this.cargarRanking();
  }


    ngOnInit() {
      console.log("Iniciando adivina");
      var adivinar: boolean = false;
      this.ranking = this.rankingService.getRankings();

      this.reiniciarJuego();

    }

    buscarPokemonAleatorio() {
        console.log("Buscando pokemon aleatorio");
        var nPokedex = Math.floor(Math.random() * this.modo) + 1;
        var pokemonObservable = this.consultaService.buscarPokemon(nPokedex).subscribe(
          (data: any) => {
        this.pokeGuess = data;
        console.log("Pokemon: " + this.pokeGuess?.name);
        var adivinar = true;
    });
    }

    noLoSe(): void {
      this.mostrarResultado = true;
      this.intentos++;
      this.intentosTotales++;
      this.racha = 0;
      this.vidas--;
      console.log("Has elegido 'No lo sé'. Pierdes una vida.");
      if (this.vidas === 0) {
        console.log("Has perdido");
        console.log("Tu puntuación ha sido de: " + this.calcularPuntuacion());
        console.log("Tu racha máxima fue de: " + this.rachaMaxima);
      } else {
        console.log("Como no vas a saber quien es " + this.pokeGuess?.name);
      }
    }

    cambioModoFacil(): void {
      this.modoFacil = !this.modoFacil;
      console.log("Modo fácil: " + (this.modoFacil ? "Activado" : "Desactivado"));
      if (this.modoFacil) {
        this.modo = 151;
        this.buscarPokemonAleatorio();
      }
    }

    juego(): void {
      if (this.formuGuess.get('guess')?.value === null || this.formuGuess.get('guess')?.value === "") {
        console.log("No has introducido nada");
        this.mostrarResultado = true;
        this.intentos++;
        this.intentosTotales++;
        this.racha = 0;
        this.vidas--;

        // this.buscarPokemonAleatorio();
    
        if (this.vidas === 0) {
          console.log("Has perdido");
          console.log("Has perdido" + "\n" + "Tu puntuación ha sido de: " + this.calcularPuntuacion());
        }
      } else if ((this.formuGuess.get('guess')?.value).toLowerCase() === this.pokeGuess?.name.toLowerCase()) {
        console.log("¡Has Acertado!");
        this.intentos++;
        this.intentosTotales++;
        this.racha++;
        this.aciertosTotales = (this.aciertosTotales || 0) + 1;
        this.acertado = true;

        if (this.racha > this.rachaMaxima) {
          this.rachaMaxima = this.racha;
        }
    
        if (this.racha === 5 || this.racha === 10 || this.racha === 15 || this.racha === 20) {
          alert("Has conseguido una racha de " + this.racha + " aciertos seguidos" + "\n" + "Has ganado una vida extra");
          this.vidas++;
        }
        // this.buscarPokemonAleatorio();
      } else {
        console.log("Has fallado");
        this.intentos++;
        this.intentosTotales++;
        this.vidas--;
        this.mostrarResultado = true;
        this.racha = 0; 
        console.log("Total intentos: " + this.intentosTotales + "\n" + "Total vidas: " + this.vidas);
        // this.buscarPokemonAleatorio();
    
        if (this.vidas === 0) {
          console.log("Has perdido");
          console.log("Has perdido" + "\n" + "Tu puntuación ha sido de: " + this.calcularPuntuacion());
          console.log("Racha máxima: " + this.rachaMaxima);
        }
      }
    }

    continuar(): void {
      this.mostrarResultado = false;
      this.buscarPokemonAleatorio();
    }

    
    colorearTipo(tipo: string){
      switch (tipo) {
          case 'normal': return 'tipo-normal'; 
          case 'fire': return 'tipo-fuego';
          case 'water': return 'tipo-agua';
          case 'electric': return 'tipo-electrico';
          case 'grass': return 'tipo-planta';
          case 'ice': return 'tipo-hielo';
          case 'fighting': return 'tipo-lucha';
          case 'poison': return 'tipo-veneno';
          case 'ground': return 'tipo-tierra';
          case 'flying': return 'tipo-volador';
          case 'psychic': return 'tipo-psiquico';
          case 'bug': return 'tipo-bicho';
          case 'rock': return 'tipo-roca';
          case 'ghost': return 'tipo-fantasma';
          case 'dragon': return 'tipo-dragon';
          case 'dark': return 'tipo-siniestro';
          case 'steel': return 'tipo-acero';
          case 'fairy': return 'tipo-hada';
          default: return 'tipo-default';
      }
    }

    calcularPuntuacion(){
      this.puntuacion = 0;
     const precision = this.aciertosTotales / this.intentosTotales;
     const base = 100; 
     const multiplicadorDeRacha = 10; 

    this.puntuacion = (precision * base) + (this.racha * multiplicadorDeRacha);
    console.log("Puntuacion: " + this.puntuacion);
    return Math.round(this.puntuacion);
    }

    guardarPuntuacion() {
  const datosUsuario = {
    id: this.generarId().toString(),
    nombre: this.formuNombre.get('nombre')?.value,
    puntuacion: this.puntuacion,
    racha: this.rachaMaxima,
    modo: this.modoFacil ? 'Fácil' : 'Normal'
  };

  // Guarda en localStorage
  let ranking = JSON.parse(localStorage.getItem('usuariosPuntuacion') || '[]');
  ranking.push(datosUsuario);
  localStorage.setItem('usuariosPuntuacion', JSON.stringify(ranking));
  console.log('Datos guardados en localStorage:', datosUsuario);

  // Guarda en frontend local (si usas signals)
  this.rankingService.addToRankings(datosUsuario);

  // 🔥 GUARDAR EN BACKEND
  this.rankingService.saveRankings(datosUsuario).subscribe({
    next: (res) => console.log('✅ Datos guardados en la base de datos:', res),
    error: (err) => console.error('❌ Error al guardar en la base de datos:', err)
  });

  alert("Puntuación guardada");
}


    verRanking(){
      this.router.navigate(['/ranking']);
    }

    eliminarPuntuacion(id: number) {
      this.rankingService.removeFromRankings(id);
    }

    // cargarRanking(): void {
    //   a 
    //   this.cargarLocalStorageData();
    //   this.ranking = JSON.parse(localStorage.getItem('usuariosPuntuacion') || '[]');
    //   this.ranking.sort((a, b) => b.puntuacion - a.puntuacion);
    // }

    cargarLocalStorageData() {
      const localStorageData = localStorage.getItem('usuariosPuntuacion');
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        this.saveToDatabase(parsedData);
      }
    }
  
    saveToDatabase(data: any) {
      this.rankingService.saveRankings(data).subscribe(
        (data : any ) => {
          console.log("Datos guardados en la base de datos", data);
        }

      );
    }

    generarId(): number{
      if (this.availableIds.length === 0) {
        throw new Error('No more unique IDs available');
      }
    
      const randomIndex = Math.floor(Math.random() * this.availableIds.length);
      const uniqueId = this.availableIds[randomIndex];
    
      // Remove the selected ID from the list of available IDs
      this.availableIds.splice(randomIndex, 1);
    
      return uniqueId;
    }

    reiniciar() {
      this.mostrarResultado = false;
      this.acertado = false;
      this.formuGuess.reset();
      this.buscarPokemonAleatorio();
      
    }

    reiniciarJuego () : void{
      console.log("Reiniciando juego");
      this.formuNombre.reset();
      this.nombreUsuario = '';
      this.puntuacion = 0;
      this.vidas = 3;
      this.aciertosTotales = 0;
      this.racha = 0;
      this.rachaMaxima = 0;
      this.intentos = 0;
      this.intentosTotales = 0;
      this.modoFacil = false;
      
      this.reiniciar();
    }


  }

