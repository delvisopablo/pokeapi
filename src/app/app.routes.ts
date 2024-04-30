import { Routes } from '@angular/router';
import { HeaderComponent } from './componentes/header/header/header.component';
import { PrincipalComponent } from './componentes/principal/principal/principal.component';
import { PokedexComponent } from './componentes/pokedex/pokedex/pokedex.component';

export const routes: Routes = [
    {path: '', component: PrincipalComponent},
    {path: 'pokedex', component: PokedexComponent}
];
