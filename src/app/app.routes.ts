import { Routes } from '@angular/router';
import { HeaderComponent } from './componentes/header/header/header.component';
import { PrincipalComponent } from './componentes/principal/principal/principal.component';
import { PokedexComponent } from './componentes/pokedex/pokedex/pokedex.component';
import { PokemonComponent } from './componentes/pokemon/pokemon.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { FooterComponent } from './componentes/footer/footer/footer.component';
import { AdivinaComponent } from './componentes/adivina/adivina.component';

export const routes: Routes = [
    {path: '', component: PrincipalComponent},
    {path: 'pokedex', component: PokedexComponent},
    {path: 'pokedex/:nPokedex', component: PokedexComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'adivina', component: AdivinaComponent},

];
