import { HttpClient } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { Component, effect, inject, Injector, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../../modelos/pokemon';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FavoritoService {

  injector = inject(Injector);
  http = inject(HttpClient);

  pokeFavs = signal<Pokemon[]>([]);
  
  constructor() {
    const favoritosAlmacen = localStorage.getItem('favoritos')
    if (favoritosAlmacen){
      this.pokeFavs.set(JSON.parse(favoritosAlmacen))
    }
    this.saveOnStorage()
   }

   saveOnStorage() {
    console.log('save storage')
    effect( () => {
      const favs = this.pokeFavs()
      localStorage.setItem('favs', JSON.stringify(favs))
    }, { injector: this.injector})
  }

// Observable<any> ( no se como hacer para conectar ambas partes)
  addTofavoritos(Pokemon: Pokemon) {
    let index = this.pokeFavs().findIndex(p => p.id === Pokemon.id);
    console.log(index);
    
    const nuevoPokemonFav: Pokemon = {...Pokemon};
    
    console.log(`No existe, añadiendo... ${JSON.stringify(nuevoPokemonFav)}`);
    const nuevoPokemonFav2: string = JSON.stringify(nuevoPokemonFav);
    
    this.pokeFavs.update((items) => [
        ...items,
        nuevoPokemonFav
    ]);

    this.http.post('http://localhost:8080/api/favoritos', nuevoPokemonFav)
        .subscribe((data: any) => {
            console.log(`Añadido ${JSON.stringify(data)}`);
        });
}

  getFavoritos(){
    return this.pokeFavs;
  }

  elementsInFavs= computed (() => this.pokeFavs().length);

  

  removeFromFavs(id:number){
    this.pokeFavs.update (
      (items)=>
        items.filter((item) => item.id != id)
    )
    this.http.delete('http://localhost:8080/api/favoritos/'+ id)
      .subscribe((data:any)=>{
         console.log(`resultado de borrar ${data}`)
      })

  }

}
