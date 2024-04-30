import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaserviceService {
  
  private data: any = {};

  url: string = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

 
  buscarPokemon(nPokedex: any): Observable<any> {
    return this.http.get(this.url + '/' + nPokedex + '/').pipe(
      map((response: any) => {
        return {
          nombre: response.forms.name,
          habilidad: response.abilities && response.abilities.ability ? response.abilities.ability.name : 'N/A',
          nPokedex: response.id,
          tipo: response.types[0].type.name,
          tipo2: response.types && response.types[1] && response.types[1].type ? response.types[1].type.name : 'N/A',          
          generacion: response.game_indices[0].version.name,
          fotoDel: response.sprites.front_default,
          fotoShiny: response.sprites.front_shiny
        };
        })
      );
   
   }

   buscarTodosPokemon(): Observable<any> {
    return new Observable(observer => {
      const response: any[] = [];
      let count = 0;
      for (let i = 1; i <= 151; i++) {
        this.buscarPokemon(i).subscribe({
          next: (data: any) => {
            response.push(data);
            count++;
            if (count === 151) {
              observer.next(response);
              observer.complete();
            }
          },
          error: (error: any) => {
            observer.error(error);
          }
        });
      }
    });
   }






    }
  




