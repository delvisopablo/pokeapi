import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pokedex } from '../../../modelos/pokedex';


@Injectable({
  providedIn: 'root'
})
export class PokedexServiceService {

  constructor() { }

  pokemonList: any = [];
  
  url = 'http://localhost:8080/api/pokedex/';

  http = inject(HttpClient);

   getEntries(): Observable<Pokedex>{
    const response = this.http.get<Pokedex>(this.url);
    // console.log(response); 
    return response
  }

  // constructor() {}

  // buscarTodosLosPokemon(): Observable<pokemons>{
  //   return this.http.get<pokemons>(this.url);
  // }

  // buscarPokemon(id:number): Observable<apiResponse> {
  //   return  this.http.get<apiResponse>(this.url + id + '/')
  // }

  // buscarPokemonNombre(nombre:string): Observable<apiResponse>{
  //   return this.http.get<apiResponse>(this.url + nombre + '/')
  // }

  // conseguirIdNombre(name:string){
  //   return this.buscarPokemonNombre(name).pipe(
  //     map((pokemon : any) => 
  //        pokemon.id)
  //   )
  //   console.log("id del pokemon: " + this.conseguirIdNombre(name));
  // }

}
