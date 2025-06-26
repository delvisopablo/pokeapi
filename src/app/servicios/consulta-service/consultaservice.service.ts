import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Pokemon } from '../../../modelos/pokemon';
import { apiResponse } from '../../../modelos/apiResponse';
import { pokemons } from '../../../modelos/pokemons';



@Injectable({
  providedIn: 'root'
})
export class ConsultaserviceService {
  
  // private data: any = {};

  pokemonList: any = [];
  
  url = 'https://pokeapi.co/api/v2/pokemon/';
  // url = 'https://localhost:8080/api/Pokemon/';


  http= inject  (HttpClient);

  constructor() {}

  
  buscarTodosLosPokemon(): Observable<pokemons>{
    return this.http.get<pokemons>(this.url);
  }

  buscarPokemon(id:number): Observable<apiResponse> {
    return  this.http.get<apiResponse>(this.url + id + '/')
  }

  buscarPokemonNombre(nombre:string): Observable<apiResponse>{
    return this.http.get<apiResponse>(this.url + nombre + '/')
  }

  conseguirIdNombre(name:string){
    return this.buscarPokemonNombre(name).pipe(
      map((pokemon : any) => 
         pokemon.id)
    )
    console.log("id del pokemon: " + this.conseguirIdNombre(name));
  }

  // buscarPokemonTipo(tipo:string){
  //   return this.http.get<apiResponse>(this.url)
  //   .pipe(
  //    map((response:apiResponse) =>
  //     response.data.filter((pokemon:Pokemon)=> {
  //       return pokemon[] === tipo;}) 
  //     ))

  // }


  // buscarPokemon(nPokedex: any): Observable<any> {
  //   return this.http.get(this.url + '/' + nPokedex + '/').pipe(
  //     map((response: any) => {
  //       return {
  //         nombre: response.name,
  //         habilidad: response.abilities && response.abilities.ability ? response.abilities.ability.name : 'N/A',
  //         nPokedex: response.id,
  //         tipo: response.types[0].type.name,
  //         tipo2: response.types && response.types[1] && response.types[1].type ? response.types[1].type.name : 'N/A',          
  //         fotoDel: response.sprites.front_default,
  //         fotoShiny: response.sprites.front_shiny
  //       };
  //       })
  //     );
  //  }

  //  buscarTodosPokemon(): Observable<any> {
  //   return new Observable(observer => {
  //     const response: any[] = [];
  //     let count = 0;
  //     for (let i = 1; i <= 151; i++) {
  //       this.buscarPokemon(i).subscribe({
  //         next: (data: any) => {
  //           response.push(data);
  //           count++;
  //           if (count === 151) {
  //             observer.next(response);
  //             observer.complete();
  //           }
  //         },
  //         error: (error: any) => {
  //           observer.error(error);
  //         }
  //       });
  //     }
  //   });
  //  }






    }
  




