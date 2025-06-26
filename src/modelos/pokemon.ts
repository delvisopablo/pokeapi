import { TypeEntry } from './type.model';

export interface Pokemon {

        id: number;
        name: string;
        sprites:{
            front_default: string,
            front_shiny: string
         };

         height: number;
         weight: number;

        types: TypeEntry[];

        generacion: string;
        pokedex: string;

        favorito: boolean, default: false;
    
        

    
    
    }

    
    
    


