import { Component, inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../../modelos/pokemon.interface';
import { ConsultaserviceService } from '../../servicios/consulta-service/consultaservice.service';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { PrincipalComponent } from '../principal/principal/principal.component';
import { FormularioComponent } from '../formulario/formulario.component';


@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [PrincipalComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {


  @Input() pokemon: Pokemon = {
        nombre: '',
        habilidad: '',
        nPokedex: 25,
        tipo: '',
        tipo2: '',
        generacion: '',
        juego: '',
        fotoDel: '',
        fotoShiny: '',
        url: '',
        pokedex: {}
  };

  pokedex = [
    {
      "entries": [
        {
          "id": 1,
          "nombre": "Bulbasaur",
          "descripcion": "A menudo encontrado en jardines, Bulbasaur puede realizar fotosíntesis con el bulbo en su espalda. Se dice que crece más fuerte bajo los rayos del sol."
        },
        {
          "id": 2,
          "nombre": "Ivysaur",
          "descripcion": "Cuando su bulbo evoluciona en una gran flor, Ivysaur gana la habilidad de manipular grandes enredaderas. Este Pokémon es más activo durante el día."
        },
        {
          "id": 3,
          "nombre": "Venusaur",
          "descripcion": "Con una flor grande en su espalda, Venusaur puede absorber y canalizar la energía solar para lanzar un poderoso rayo solar. Dominante en territorios extensos."
        },
        {
          "id": 4,
          "nombre": "Charmander",
          "descripcion": "La llama en la punta de la cola de Charmander indica su salud y emoción. Arde más brillante cuando está enérgico."
        },
        {
          "id": 5,
          "nombre": "Charmeleon",
          "descripcion": "Salvaje y tempestuoso, Charmeleon golpea a sus oponentes con su cola robusta y cuando se enfurece, la llama de su cola arde con un color azul brillante."
        },
        {
          "id": 6,
          "nombre": "Charizard",
          "descripcion": "Charizard vuela por el cielo buscando poderosos oponentes. Escupe fuego tan caliente que puede derretir rocas."
        },
        {
          "id": 7,
          "nombre": "Squirtle",
          "descripcion": "El caparazón de Squirtle no sólo es para protección. La forma redondeada y las ranuras en su superficie ayudan a minimizar la resistencia en el agua, permitiendo a Squirtle nadar a altas velocidades."
        },
        {
          "id": 8,
          "nombre": "Wartortle",
          "descripcion": "Wartortle utiliza la suave y peluda cola como un flotador durante la natación. Se dice que su cola tiene una cualidad mágica que brilla cuando se ve bajo la luz de la luna llena."
        },
        {
          "id": 9,
          "nombre": "Blastoise",
          "descripcion": "Blastoise puede disparar chorros de agua con más fuerza que una manguera de bomberos. Todos los chorros de agua de Blastoise salen de los cañones de su caparazón."
        },
        {
          "id": 10,
          "nombre": "Caterpie",
          "descripcion": "Caterpie tiene un apetito voraz. Puede devorar hojas más grandes que su cuerpo antes de su evolución a Metapod. Usa los tentáculos de su cabeza para repeler a los atacantes."
        },
        {
          "id": 11,
          "nombre": "Metapod",
          "descripcion": "Metapod es conocido por su dura carcasa que protege su cuerpo blando y vulnerable mientras se prepara para evolucionar. Permanece casi inmóvil en este estado."
        },
        {
          "id": 12,
          "nombre": "Butterfree",
          "descripcion": "Butterfree tiene un sentido del olfato excepcionalmente agudo. Puede detectar el polen de las flores y los aromas a kilómetros de distancia."
        },
        {
          "id": 13,
          "nombre": "Weedle",
          "descripcion": "Weedle utiliza la aguja afilada en su cabeza para defenderse. Se alimenta de hojas cubiertas de rocío que recoge en los bosques."
        },
        {
          "id": 14,
          "nombre": "Kakuna",
          "descripcion": "Al igual que Metapod, Kakuna se mantiene casi inmóvil mientras se desarrolla internamente para evolucionar. Su veneno se vuelve más potente antes de la evolución."
        },
        {
          "id": 15,
          "nombre": "Beedrill",
          "descripcion": "Beedrill defiende su territorio con ferocidad, atacando con sus grandes aguijones venenosos. Trabaja en enjambres para repeler intrusos."
        },
        {
          "id": 16,
          "nombre": "Pidgey",
          "descripcion": "Pidgey tiene un sentido de la dirección extremadamente desarrollado. Puede regresar a su nido sin importar la distancia que lo separe de su hogar."
        },
        {
          "id": 17,
          "nombre": "Pidgeotto",
          "descripcion": "Pidgeotto reclama un vasto territorio como suyo, patrullando el área y cazando con sus impresionantes habilidades de vuelo."
        },
        {
          "id": 18,
          "nombre": "Pidgeot",
          "descripcion": "Pidgeot puede crear ráfagas de viento capaces de doblar árboles grandes gracias a la velocidad de sus alas. Es admirado por su velocidad y elegancia."
        },
        {
          "id": 19,
          "nombre": "Rattata",
          "descripcion": "Rattata es extremadamente ágil y audaz. A pesar de su tamaño, no teme a los oponentes, independientemente de su fuerza."
        },
        {
          "id": 20,
          "nombre": "Raticate",
          "descripcion": "Raticate utiliza sus colmillos afilados para roer cualquier cosa. Considerado un plaga en muchas áreas, es muy territorial y agresivo."
        },
        {
          "id": 21,
          "nombre": "Spearow",
          "descripcion": "Spearow tiene un grito agudo que utiliza para asustar a sus enemigos. Es muy protector de su territorio, lo que lo hace agresivo hacia los extraños."
        },
        {
          "id": 22,
          "nombre": "Fearow",
          "descripcion": "Fearow es conocido por su impresionante resistencia, capaz de volar todo el día sin necesidad de aterrizar. Sus largas alas le permiten volar grandes distancias sin esfuerzo."
        },
        {
          "id": 23,
          "nombre": "Ekans",
          "descripcion": "Ekans se mueve en silencio y sin previo aviso, enredándose entre la hierba alta para acechar a su presa. Puede desenredarse rápidamente para capturar a enemigos desprevenidos."
        },
        {
          "id": 24,
          "nombre": "Arbok",
          "descripcion": "Arbok es intimidante con su capucha ensanchada marcada con ojos amenazantes. Puede aplastar objetos con su cuerpo al enrollarse alrededor de ellos."
        },
        {
          "id": 25,
          "nombre": "Pikachu",
          "descripcion": "Pikachu almacena electricidad en las bolsas de sus mejillas y la libera en descargas eléctricas como un mecanismo de defensa o durante las batallas."
        },
        {
          "id": 26,
          "nombre": "Raichu",
          "descripcion": "Raichu emite una débil corriente eléctrica por todo su cuerpo que lo hace brillar en la oscuridad. Este Pokémon puede cargar un generador eléctrico con un solo toque."
        },
        {
          "id": 27,
          "nombre": "Sandshrew",
          "descripcion": "Sandshrew puede enrollarse en una bola que le permite resistir golpes y temperaturas extremas. Este Pokémon es comúnmente encontrado en áreas áridas."
        },
        {
          "id": 28,
          "nombre": "Sandslash",
          "descripcion": "Sandslash puede rápidamente excavar en el suelo a alta velocidad para emboscar a sus presas desde abajo. Sus garras son tan afiladas como cuchillas."
        },
        {
          "id": 29,
          "nombre": "Nidoran♀",
          "descripcion": "A pesar de su apariencia, Nidoran♀ es muy feroz y puede plantar una pelea con sus afilados cuernos si se siente amenazada."
        },
        {
          "id": 30,
          "nombre": "Nidorina",
          "descripcion": "Nidorina prefiere mantenerse en familia y es muy protectora con sus crías. Este Pokémon es más dócil en comparación con su forma evolutiva."
        },
        {
          "id": 31,
          "nombre": "Nidoqueen",
          "descripcion": "Nidoqueen, la forma final de Nidoran♀, tiene un cuerpo extremadamente duro que puede aplastar rocas. Raramente se la ve lejos de su nido."
        },
        {
          "id": 32,
          "nombre": "Nidoran♂",
          "descripcion": "Nidoran♂ tiene orejas más grandes que su contraparte femenina, lo que le permite detectar peligros a distancias más largas."
        },
        {
          "id": 33,
          "nombre": "Nidorino",
          "descripcion": "Nidorino tiene un cuerno venenoso que es más duro que diamante. Si se siente acorralado, atacará sin previo aviso."
        },
        {
          "id": 34,
          "nombre": "Nidoking",
          "descripcion": "Nidoking posee una fuerza tremenda, capaz de derribar estructuras metálicas con un solo golpe de su poderosa cola."
        },
        {
          "id": 35,
          "nombre": "Clefairy",
          "descripcion": "Clefairy es conocido por su rara aparición bajo la luz de la luna. Este Pokémon puede realizar saltos increíblemente altos gracias a su baja gravedad."
        },
        {
          "id": 36,
          "nombre": "Clefable",
          "descripcion": "Clefable se mueve con tal ligereza y gracia que puede caminar sobre el agua y, a veces, incluso parece que está volando."
        },
        {
          "id": 37,
          "nombre": "Vulpix",
          "descripcion": "Vulpix tiene una sola cola blanca que se divide en muchas colas a medida que crece. Este Pokémon exuda un calor que puede alcanzar los 900 grados Fahrenheit."
        },
        {
          "id": 38,
          "nombre": "Ninetales",
          "descripcion": "Ninetales puede lanzar una maldición con su mirada penetrante. Se dice que este Pokémon vive durante miles de años."
        },
        {
          "id": 39,
          "nombre": "Jigglypuff",
          "descripcion": "Jigglypuff tiene la capacidad de cantar una nana que puede hacer dormir a cualquier criatura. Sin embargo, se enfada mucho si alguien se duerme antes de que termine su canción."
        },
        {
          "id": 40,
          "nombre": "Wigglytuff",
          "descripcion": "Wigglytuff tiene un pelaje extremadamente elástico y suave que lo hace muy resistente a los golpes. Este Pokémon expande su cuerpo para intimidar a los enemigos."
        },
        {
          "id": 41,
          "nombre": "Zubat",
          "descripcion": "Zubat evita la luz del sol debido a sus ojos sensibles. Se guía por ecolocalización y es más activo durante la noche."
        },
        {
          "id": 42,
          "nombre": "Golbat",
          "descripcion": "Golbat ama la sangre de seres vivos y es capaz de volar toda la noche en busca de presas. Su mordida puede parecer leve, pero es peligrosa."
        },
        {
          "id": 43,
          "nombre": "Oddish",
          "descripcion": "Oddish entierra su cuerpo en la tierra durante el día y camina con sus patas raíz durante la noche para no marchitarse con el sol."
        },
        {
          "id": 44,
          "nombre": "Gloom",
          "descripcion": "Gloom libera un olor fétido cuando se siente amenazado. A pesar de su aroma, el néctar que produce es delicioso."
        },
        {
          "id": 45,
          "nombre": "Vileplume",
          "descripcion": "Vileplume tiene la mayor cabeza de flor entre todos los Pokémon conocidos. Utiliza sus pétalos tóxicos para paralizar y derrotar a sus enemigos."
        },
        {
          "id": 46,
          "nombre": "Paras",
          "descripcion": "Paras tiene hongos parásitos en su espalda que crecen con su cuerpo. Los hongos se usan como elixir en algunas culturas."
        },
        {
          "id": 47,
          "nombre": "Parasect",
          "descripcion": "Parasect es controlado por el gran hongo que lleva en su espalda. El hongo puede esporas que pueden usarse tanto para atacar como para curar."
        },
        {
          "id": 48,
          "nombre": "Venonat",
          "descripcion": "Venonat tiene ojos compuestos que le permiten ver en la oscuridad total. Este Pokémon se siente atraído por la luz."
        },
        {
          "id": 49,
          "nombre": "Venomoth",
          "descripcion": "Venomoth es nocturno y tiene escamas en sus alas que libera como defensa al sentirse amenazado. Estas escamas son altamente tóxicas."
        },
        {
          "id": 50,
          "nombre": "Diglett",
          "descripcion": "Diglett es casi siempre visto sólo como una cabeza que emerge del suelo. Nadie ha visto nunca la parte inferior de un Diglett."
        },
        {
          "id": 51,
          "nombre": "Dugtrio",
          "descripcion": "Dugtrio, la evolución de Diglett, es un trío de Digletts unidos. Este Pokémon puede causar terremotos y se desplaza bajo tierra a gran velocidad."
        },
        {
          "id": 52,
          "nombre": "Meowth",
          "descripcion": "Meowth adora los objetos redondos y brillantes y es conocido por vagar por las calles por la noche para encontrar monedas perdidas."
        },
        {
          "id": 53,
          "nombre": "Persian",
          "descripcion": "Persian tiene un pelaje suave y lujoso; es un símbolo de riqueza en ciertas regiones. Este Pokémon es muy territorial y agresivo si se le provoca."
        },
        {
          "id": 54,
          "nombre": "Psyduck",
          "descripcion": "Psyduck sufre de dolores de cabeza crónicos, intensificando sus poderes psíquicos sin querer cuando los dolores se vuelven insoportables."
        },
        {
          "id": 55,
          "nombre": "Golduck",
          "descripcion": "Golduck es un nadador extremadamente hábil que supera incluso a los mejores atletas humanos. A menudo se le ve nadando en cuerpos de agua salvajes."
        },
        {
          "id": 56,
          "nombre": "Mankey",
          "descripcion": "Mankey se enoja fácilmente y no olvida lo que le provoca su ira. Este Pokémon puede volverse violento si se siente burlado o amenazado."
        },
        {
          "id": 57,
          "nombre": "Primeape",
          "descripcion": "Primeape es perpetuamente enfadado y no se calma hasta que su oponente está derrotado. Es tan enérgico que persigue a enemigos a gran velocidad."
        },
        {
          "id": 58,
          "nombre": "Growlithe",
          "descripcion": "Growlithe tiene un sentido del olfato muy desarrollado, capaz de oler emociones. Este leal Pokémon guarda ferozmente su territorio."
        },
        {
          "id": 59,
          "nombre": "Arcanine",
          "descripcion": "Arcanine es conocido por su velocidad y valentía. Antiguamente, se le consideraba un Pokémon legendario y era montado por reyes en batalla."
        },
        {
          "id": 60,
          "nombre": "Poliwag",
          "descripcion": "Poliwag tiene una piel muy suave que es resbaladiza al tacto. Este Pokémon puede escapar de enemigos liberándose con la fuerza de su cola espiral."
        },
        {
          "id": 61,
          "nombre": "Poliwhirl",
          "descripcion": "Poliwhirl transpira un fluido viscoso que lo hace difícil de agarrar. Este Pokémon se siente más cómodo en el agua que en tierra."
        },
        {
          "id": 62,
          "nombre": "Poliwrath",
          "descripcion": "Poliwrath posee músculos extremadamente desarrollados que nunca se fatigan, no importa cuánto ejercite. Es un nadador nato que puede cruzar océanos enteros."
        },
        {
          "id": 63,
          "nombre": "Abra",
          "descripcion": "Abra duerme 18 horas al día, pero incluso dormido puede teletransportarse a un lugar seguro si presiente peligro."
        },
        {
          "id": 64,
          "nombre": "Kadabra",
          "descripcion": "Kadabra emite ondas alfa que pueden causar dolores de cabeza a los que estén cerca y utiliza una cuchara de plata para amplificar sus poderes psíquicos."
        },
        {
          "id": 65,
          "nombre": "Alakazam",
          "descripcion": "Alakazam tiene un IQ de más de 5000. Este Pokémon recuerda todo lo que ha ocurrido en el mundo y puede resolver problemas complejos rápidamente."
        },
        {
          "id": 66,
          "nombre": "Machop",
          "descripcion": "Machop tiene una fuerza sobrenatural y es capaz de levantar pesos que multiplican varias veces su propio peso corporal."
        },
        {
          "id": 67,
          "nombre": "Machoke",
          "descripcion": "Machoke lleva un cinturón que regula su energía y fuerza. Este Pokémon tiene tanta fuerza que debe llevar un cinturón de poder para regular sus movimientos."
        },
        {
          "id": 68,
          "nombre": "Machamp",
          "descripcion": "Machamp es tan fuerte que puede derribar lo que quiera. Sin embargo, si no tiene cuidado, puede destruir su entorno accidentalmente."
        },
        {
          "id": 69,
          "nombre": "Bellsprout",
          "descripcion": "Bellsprout puede chasquear su cuerpo delgado y flexible para atrapar presas pequeñas. Este Pokémon escupe un ácido corrosivo para digerir a sus enemigos."
        },
        {
          "id": 70,
          "nombre": "Weepinbell",
          "descripcion": "Weepinbell tiene un gancho en su parte trasera que utiliza para colgarse de las ramas mientras espera a sus presas con la boca abierta."
        },
        {
          "id": 71,
          "nombre": "Victreebel",
          "descripcion": "Victreebel tiene una enzima digestiva en su boca que se disuelve rápidamente en cualquier cosa que caiga dentro de ella. Se mimetiza como una planta para atrapar a sus presas."
        },
        {
          "id": 72,
          "nombre": "Tentacool",
          "descripcion": "Tentacool flota en el agua absorbiendo nutrientes y es casi invisible en el agua, lo cual a menudo lleva a encuentros sorpresivos con nadadores."
        },
        {
          "id": 73,
          "nombre": "Tentacruel",
          "descripcion": "Tentacruel tiene 80 tentáculos que pueden extenderse y retraerse libremente. Este Pokémon es temido por su picadura venenosa."
        },
        {
          "id": 74,
          "nombre": "Geodude",
          "descripcion": "Geodude puede rodar cuesta abajo para moverse a gran velocidad. Este Pokémon a menudo se confunde con una roca y es pisoteado accidentalmente."
        },
        {
          "id": 75,
          "nombre": "Graveler",
          "descripcion": "Graveler crece consumiendo toneladas de rocas. A menudo se ve rodando montaña abajo para golpear rocas más grandes en pedazos más pequeños."
        },
        {
          "id": 76,
          "nombre": "Golem",
          "descripcion": "Golem es capaz de retirarse a su carcasa y rodar a gran velocidad para escapar de sus enemigos. Este Pokémon prefiere vivir en montañas o en terrenos rocosos."
        },
        {
          "id": 77,
          "nombre": "Ponyta",
          "descripcion": "Ponyta puede saltar increíblemente alto y corre tan rápido que parece que vuela. Su melena de fuego se intensifica cuando está emocionado."
        },
        {
          "id": 78,
          "nombre": "Rapidash",
          "descripcion": "Rapidash galopa a una velocidad que es casi invisible a simple vista. Se dice que este Pokémon corre sobre un arco iris cuando alcanza su velocidad máxima."
        },
        {
          "id": 79,
          "nombre": "Slowpoke",
          "descripcion": "Slowpoke usa la cola para atrapar presas en el agua. Este Pokémon olvida lo que estaba haciendo a menudo y pasa días enteros simplemente holgazaneando en la orilla."
        },
        {
          "id": 80,
          "nombre": "Slowbro",
          "descripcion": "Slowbro tiene un Shellder pegado a su cola, lo que le impide usarla para pescar. Este cambio lo hace caminar sobre dos patas con más frecuencia."
        },
        {
          "id": 81,
          "nombre": "Magnemite",
          "descripcion": "Magnemite se adhiere fuertemente a los metales con potentes fuerzas magnéticas. Este Pokémon puede flotar en el aire ajustando su energía eléctrica."
        },
        {
          "id": 82,
          "nombre": "Magneton",
          "descripcion": "Magneton se forma por la unión de tres Magnemites. Este Pokémon puede generar poderosas ondas de radio y campos magnéticos que interfieren con la electrónica."
        },
        {
          "id": 83,
          "nombre": "Farfetch'd",
          "descripcion": "Farfetch'd es siempre visto con un puerro que usa como arma. Este Pokémon es muy orgulloso y se dice que el puerro que lleva es su tesoro más preciado."
        },
        {
          "id": 84,
          "nombre": "Doduo",
          "descripcion": "Doduo, aunque parece torpe en tierra, puede correr a velocidades de hasta 60 km/h. Las dos cabezas tienen personalidades distintas."
        },
        {
          "id": 85,
          "nombre": "Dodrio",
          "descripcion": "Dodrio tiene tres cabezas que le permiten mantenerse alerta en todo momento. Aunque corre extremadamente rápido, puede volar a baja altura."
        },
        {
          "id": 86,
          "nombre": "Seel",
          "descripcion": "Seel caza bajo el agua y puede dormir mientras nada. Su gruesa piel de grasa lo protege del frío extremo."
        },
        {
          "id": 87,
          "nombre": "Dewgong",
          "descripcion": "Dewgong ama dormir sobre el hielo frígido. Este Pokémon se sumerge en aguas heladas para cazar, utilizando su afilada nariz para romper el hielo."
        },
        {
          "id": 88,
          "nombre": "Grimer",
          "descripcion": "Grimer se originó de lodo expuesto a radiación de la luna. Este Pokémon deja un rastro de lodo tóxico a dondequiera que va."
        },
        {
          "id": 89,
          "nombre": "Muk",
          "descripcion": "Muk produce un cuerpo de toxinas que mataría incluso la hierba. Este Pokémon prefiere vivir en áreas contaminadas y sucias."
        },
        {
          "id": 90,
          "nombre": "Shellder",
          "descripcion": "Shellder puede cerrar su concha de forma estanca para protegerse. Este Pokémon se adhiere a sus presas con su lengua y no las suelta."
        },
        {
          "id": 91,
          "nombre": "Cloyster",
          "descripcion": "Cloyster es capaz de lanzar espinas de su concha, que tiene una dureza comparable al acero. Prefiere vivir en el fondo del mar."
        },
        {
          "id": 92,
          "nombre": "Gastly",
          "descripcion": "Gastly está compuesto casi completamente por gas. Cuando expone su verdadera forma, sus contornos se mezclan con la oscuridad de la noche."
        },
        {
          "id": 93,
          "nombre": "Haunter",
          "descripcion": "Haunter acecha en la oscuridad, esperando que una víctima se acerque. Si lo tocas, te paralizará absorbiendo el calor de tu cuerpo."
        },
        {
          "id": 94,
          "nombre": "Gengar",
          "descripcion": "Gengar disfruta de las sombras y asusta a sus enemigos haciéndoles creer que están malditos. Este Pokémon ama causar miedo y caos."
        },
        {
          "id": 95,
          "nombre": "Onix",
          "descripcion": "Onix puede excavar a más de 80 km por hora. Este Pokémon se compone de grandes rocas que son más duras que el diamante."
        },
        {
          "id": 96,
          "nombre": "Drowzee",
          "descripcion": "Drowzee puede poner a cualquier criatura a dormir usando sus poderes psíquicos. Se alimenta de los sueños de sus enemigos."
        },
        {
          "id": 97,
          "nombre": "Hypno",
          "descripcion": "Hypno lleva un péndulo con él y puede usarlo para dormir a sus enemigos. A veces se le encuentra llevando a la gente dormida a escondidas."
        },
        {
          "id": 98,
          "nombre": "Krabby",
          "descripcion": "Krabby vive en la playa, enterrado en agujeros en la arena. En la marea baja, se puede ver este Pokémon defendiendo su territorio."
        },
        {
          "id": 99,
          "nombre": "Kingler",
          "descripcion": "Kingler tiene una pinza gigante. Puede romper cualquier cosa con ella, pero es muy pesada y difícil de usar."
        },
        {
          "id": 100,
          "nombre": "Voltorb",
          "descripcion": "Voltorb fue descubierto en una planta de energía. Este Pokémon tiene una forma y textura similares a una Poké Ball."
        },
        {
          "id": 101,
          "nombre": "Electrode",
          "descripcion": "Electrode consume electricidad en la atmósfera. En días de tormenta, este Pokémon explota debido a la sobrecarga de energía eléctrica."
        },
        {
          "id": 102,
          "nombre": "Exeggcute",
          "descripcion": "Exeggcute son seis huevos que comparten una telepatía única. A menudo son confundidos con semillas."
        },
        {
          "id": 103,
          "nombre": "Exeggutor",
          "descripcion": "Exeggutor tiene tres cabezas que piensan independientemente. A pesar de esto, nunca parece tener problemas para tomar decisiones."
        },
        {
          "id": 104,
          "nombre": "Cubone",
          "descripcion": "Cubone lleva el cráneo de su madre muerta como casco. La tristeza y el dolor de su pérdida alimentan su fuerza."
        },
        {
          "id": 105,
          "nombre": "Marowak",
          "descripcion": "Marowak es la forma evolucionada de Cubone. Ha superado el dolor de la pérdida de su madre y ahora es más duro y resuelto."
        },
        {
          "id": 106,
          "nombre": "Hitmonlee",
          "descripcion": "Hitmonlee tiene unas piernas extremadamente elásticas que pueden patear repetidamente y con una fuerza aplastante."
        },
        {
          "id": 107,
          "nombre": "Hitmonchan",
          "descripcion": "Hitmonchan es capaz de lanzar puñetazos tan rápidos que son apenas visibles. Se entrena bajo cascadas para fortalecer su cuerpo."
        },
        {
          "id": 108,
          "nombre": "Lickitung",
          "descripcion": "Lickitung tiene una lengua increíblemente larga que usa para atrapar presas y explorar su entorno. Su saliva puede paralizar."
        },
        {
          "id": 109,
          "nombre": "Koffing",
          "descripcion": "Koffing contiene gases tóxicos en su cuerpo. Libera toxinas a través de los poros cuando se siente amenazado."
        },
        {
          "id": 110,
          "nombre": "Weezing",
          "descripcion": "Weezing tiene dos cabezas que expulsan un gas venenoso. Puede provocar explosiones al mezclar sus gases internos."
        },
        {
          "id": 111,
          "nombre": "Rhyhorn",
          "descripcion": "Rhyhorn corre en línea recta, aplastando todo a su paso. No se detiene a menos que se duerma o choque con algo."
        },
        {
          "id": 112,
          "nombre": "Rhydon",
          "descripcion": "Rhydon tiene una piel tan dura que puede sobrevivir en magma. Utiliza su cuerno para perforar rocas y para batallas intensas."
        },
        {
          "id": 113,
          "nombre": "Chansey",
          "descripcion": "Chansey lleva un huevo nutritivo en su bolsa. Este Pokémon es conocido por su capacidad para curar a otros."
        },
        {
          "id": 114,
          "nombre": "Tangela",
          "descripcion": "Tangela está cubierto de enredaderas que crecen continuamente. Rara vez se ve su verdadera forma."
        },
        {
          "id": 115,
          "nombre": "Kangaskhan",
          "descripcion": "Kangaskhan protege a su cría en su bolsa. Se vuelve extremadamente agresivo si percibe una amenaza hacia su pequeño."
        },
        {
          "id": 116,
          "nombre": "Horsea",
          "descripcion": "Horsea escupe tinta para escapar cuando está en peligro. Este Pokémon es muy preciso al apuntar con agua para cazar."
        },
        {
          "id": 117,
          "nombre": "Seadra",
          "descripcion": "Seadra duerme después de enroscarse entre las ramas de los corales. Este Pokémon dispara chorros de agua con gran fuerza."
        },
        {
          "id": 118,
          "nombre": "Goldeen",
          "descripcion": "Goldeen es conocido por su belleza y la agilidad con la que nada. Puede realizar saltos impresionantes sobre la superficie del agua."
        },
        {
          "id": 119,
          "nombre": "Seaking",
          "descripcion": "Seaking usa su cuerno para perforar rocas y defender su territorio. Durante la temporada de apareamiento, su colorido se intensifica."
        },
        {
          "id": 120,
          "nombre": "Staryu",
          "descripcion": "Staryu tiene la capacidad de regenerar cualquier parte de su cuerpo que pierda en batalla. Brilla con la luz de las estrellas."
        },
        {
          "id": 121,
          "nombre": "Starmie",
          "descripcion": "Starmie tiene un núcleo brillante que es valorado como gema. Este Pokémon puede emitir pulsos psíquicos."
        },
        {
          "id": 122,
          "nombre": "Mr. Mime",
          "descripcion": "Mr. Mime puede crear barreras invisibles con solo mover los dedos. Este Pokémon es un maestro del mimetismo y el silencio."
        },
        {
          "id": 123,
          "nombre": "Scyther",
          "descripcion": "Scyther es extremadamente ágil y orgulloso. Este Pokémon no puede soportar ver algo más rápido que él."
        },
        {
          "id": 124,
          "nombre": "Jynx",
          "descripcion": "Jynx camina de manera rítmica, balanceando y sacudiendo sus caderas como si estuviera bailando. Su movimiento hipnótico compulsa a las personas a bailar."
        },
        {
          "id": 125,
          "nombre": "Electabuzz",
          "descripcion": "Electabuzz acumula electricidad de la atmósfera. La electricidad hace que este Pokémon brille en la oscuridad."
        },
        {
          "id": 126,
          "nombre": "Magmar",
          "descripcion": "Magmar exhala un calor abrasador de todo su cuerpo para incinerar a sus enemigos. Este Pokémon aparece cerca de los cráteres volcánicos."
        },
        {
          "id": 127,
          "nombre": "Pinsir",
          "descripcion": "Pinsir tiene unas pinzas enormes que utiliza para atrapar a sus enemigos y triturarlos. Este Pokémon es muy territorial."
        },
        {
          "id": 128,
          "nombre": "Tauros",
          "descripcion": "Tauros se enoja fácilmente y embiste cualquier cosa que vea moverse. Si ve una bandera roja, pierde el control completamente."
        },
        {
          "id": 129,
          "nombre": "Magikarp",
          "descripcion": "Magikarp es conocido por su debilidad. Sin embargo, es muy resistente y puede sobrevivir en cualquier cuerpo de agua por más contaminada que esté."
        },
        {
          "id": 130,
          "nombre": "Gyarados",
          "descripcion": "Gyarados es notoriamente malhumorado y destructivo. Este Pokémon evoluciona de Magikarp y es un cambio drástico en poder y temperamento."
        },
        {
          "id": 131,
          "nombre": "Lapras",
          "descripcion": "Lapras es gentil y le gusta transportar gente por el agua. Este Pokémon puede comunicarse con los humanos a través de canciones telepáticas."
        },
        {
          "id": 132,
          "nombre": "Ditto",
          "descripcion": "Ditto puede transformarse en cualquier cosa. Sin embargo, si trata de transformarse en algo basándose solo en su memoria, puede equivocarse."
        },
        {
          "id": 133,
          "nombre": "Eevee",
          "descripcion": "Eevee tiene un código genético inestable que le permite evolucionar en varias formas diferentes dependiendo del entorno en que se encuentre."
        },
        {
          "id": 134,
          "nombre": "Vaporeon",
          "descripcion": "Vaporeon se funde con el agua para esconderse de sus enemigos. Este Pokémon puede controlar las moléculas de agua."
        },
        {
          "id": 135,
          "nombre": "Jolteon",
          "descripcion": "Jolteon libera un potente voltaje eléctrico de sus pelos puntiagudos. Este Pokémon se carga más rápidamente en días tormentosos."
        },
        {
          "id": 136,
          "nombre": "Flareon",
          "descripcion": "Flareon tiene una llama interna que alcanza temperaturas de hasta 1,650 grados Celsius. Expulsa calor por su piel."
        },
        {
          "id": 137,
          "nombre": "Porygon",
          "descripcion": "Porygon es un Pokémon creado completamente por programación computarizada. Puede moverse libremente en el ciberespacio."
        },
        {
          "id": 138,
          "nombre": "Omanyte",
          "descripcion": "Omanyte es un Pokémon fósil resucitado que usa su habilidad para retirarse a su concha dura para protegerse de los enemigos."
        },
        {
          "id": 139,
          "nombre": "Omastar",
          "descripcion": "Omastar, una evolución de Omanyte, tiene tentáculos que pueden atrapar a su presa firmemente. Se cree que su extinción se debe a su concha pesada que le impidió cazar eficazmente."
        },
        {
          "id": 140,
          "nombre": "Kabuto",
          "descripcion": "Kabuto es un Pokémon fósil que ha sido regenerado. Se mantiene en su concha dura para protegerse mientras estudia su entorno."
        },
        {
          "id": 141,
          "nombre": "Kabutops",
          "descripcion": "Kabutops caza con sus afiladas garras. Este Pokémon se movía de caza en las antiguas aguas poco profundas acechando a su presa."
        },
        {
          "id": 142,
          "nombre": "Aerodactyl",
          "descripcion": "Aerodactyl es un Pokémon prehistórico revivido a partir de ADN fósil. Este feroz Pokémon volaba por los cielos antiguos cazando con sus afiladas garras."
        },
        {
          "id": 143,
          "nombre": "Snorlax",
          "descripcion": "Snorlax bloquea el camino donde decide dormir. Este Pokémon come más de 400 kilogramos de comida antes de su siesta."
        },
        {
          "id": 144,
          "nombre": "Articuno",
          "descripcion": "Articuno es un Pokémon legendario que puede controlar el hielo. El batir de sus alas congela el aire."
        },
        {
          "id": 145,
          "nombre": "Zapdos",
          "descripcion": "Zapdos es un Pokémon legendario que recolecta energía eléctrica mientras vuela por las nubes. Se dice que aparece cuando caen rayos."
        },
        {
          "id": 146,
          "nombre": "Moltres",
          "descripcion": "Moltres es un Pokémon legendario que puede controlar el fuego. Cuando se hiere, se sumerge en el magma volcánico para quemar y curar sus heridas."
        },
        {
          "id": 147,
          "nombre": "Dratini",
          "descripcion": "Dratini continuamente muda y crece más largo. Este Pokémon vive en aguas profundas y es raramente visto."
        },
        {
          "id": 148,
          "nombre": "Dragonair",
          "descripcion": "Dragonair almacena una gran cantidad de energía dentro de sí. Este Pokémon es conocido por cambiar las condiciones climáticas a su voluntad."
        },
        {
          "id": 149,
          "nombre": "Dragonite",
          "descripcion": "Dragonite es extremadamente amable y ayuda a los barcos perdidos en tormentas a encontrar el camino a tierra."
        },
        {
          "id": 150,
          "nombre": "Mewtwo",
          "descripcion": "Mewtwo fue creado por manipulación genética. Sin embargo, aunque los científicos le dotaron de una vida, no pudieron dotarlo de un corazón compasivo."
        },
        {
          "id": 151,
          "nombre": "Mew",
          "descripcion": "Mew contiene el código genético de todos los Pokémon y puede hacerse invisible a voluntad, así que raramente es visto por humanos."
        }
      ]
    }];

    router: Router;
  
    data: any;
    nPokedex: any = 25;
    esShiny: boolean = false;
    currentImage: string = '';
    cargando: boolean = false;
  
  
      constructor(private consultaService: ConsultaserviceService) {
       
        this.consultaService = inject(ConsultaserviceService);
        this.consultaService.buscarPokemon(this.nPokedex);
        this.router = inject(Router);
       }
  
      ngOnInit() {
        this.esShiny = false;
        this.getDatos(this.nPokedex);
        this.mayusculas(this.pokemon.nombre);
        
       }

      ngOnChanges(changes: SimpleChanges) {
        if (changes["pokemon"] && changes["pokemon"].currentValue) {
          this.getDatos(changes["pokemon"].currentValue.nPokedex);
        }
      }


  
      getDatos(termino: any) {
        this.cargando = true;
        this.consultaService.buscarPokemon(termino).subscribe({
          next: (data: any) => {
            this.pokemon = data;
            this.pokemon.generacion = this.calcularGeneracion(this.pokemon.nPokedex);
            this.esShiny = false;
            this.cargando = false;
            console.log(this.pokemon);
          }, 
          error: (error: any) => {
            console.error(error);
            this.cargando = false;
          }
          })
        }
  

       

        verShiny() {
          this.esShiny = !this.esShiny;
          this.currentImage = this.esShiny ? this.pokemon.fotoShiny : this.pokemon.fotoDel;
        }

        verPokedex() {
          this.router.navigate(['/pokedex/' + this.pokemon.nPokedex]);
        }
      
        cambiarPokemon(cambio: number) {
          const newId = this.pokemon.nPokedex + cambio;
          this.getDatos(newId);
          this.esShiny = false;
        }

        calcularGeneracion(nPokedex: number){
          if (nPokedex <= 151) {
            return 'Primera';
          }else if (nPokedex <= 251) {
            return 'Segunda';
          }else if (nPokedex <= 386) {
            return 'Tercera';
          }else if (nPokedex <= 493) {  
            return 'Cuarta';
          }else if (nPokedex <= 649) {  
            return 'Quinta';
          } else if (nPokedex <= 721) {
            return 'Sexta';
          }else if (nPokedex <= 809) {
            return 'Séptima';
          } else if (nPokedex <= 898){
            return 'Octava';
          } else {  
            return 'Novena';
          }
        }
  
        mayusculas(value: string): string {
          if (!value) return value;
          return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
  
        colorearTipo(tipo: string): string {
          switch (tipo) {
              case 'normal':
              return 'tipo-normal';
              case 'fire':
              return "tipo-fuego";
              case 'water':
              return 'background-color: var(--water-color)';
              case 'electric':
              return 'background-color: var(--electric-color)';
              case 'grass':
              return 'background-color: var(--grass-color)';
              case 'ice':
              return 'background-color: var(--ice-color)';
              case 'fighting':
              return 'background-color: var(--fighting-color)';
              case 'poison':
              return 'background-color: var(--poison-color)';
              case 'ground':
              return 'background-color: var(--ground-color)';
              case 'flying':
              return 'background-color: var(--flying-color)';
              case 'psychic':
              return 'background-color: var(--psychic-color)';
              case 'bug':
              return 'background-color: var(--bug-color)';
              case 'rock':
              return 'background-color: var(--rock-color)';
              case 'ghost':
              return 'background-color: var(--ghost-color)';
              case 'dragon':
              return 'background-color: var(--dragon-color)';
              case 'dark':
              return 'background-color: var(--dark-color)';
              case 'steel':
              return 'background-color: var(--steel-color)';
              case 'fairy':
              return 'background-color: var(--fairy-color)';
              default:
              return 'background-color: var(--default-color)';
          }
        }
  
  
    }
  
  
  
