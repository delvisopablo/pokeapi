import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { HeaderComponent } from './componentes/header/header/header.component';
import { PrincipalComponent } from './componentes/principal/principal/principal.component';
import { PokedexComponent } from './componentes/pokedex/pokedex/pokedex.component';
import { PokemonComponent } from './componentes/pokemon/pokemon.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { FooterComponent } from './componentes/footer/footer/footer.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PrincipalComponent, PokedexComponent, PokemonComponent, FormularioComponent, ReactiveFormsModule, FormsModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'API Pokémon';

}
