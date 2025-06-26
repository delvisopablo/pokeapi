import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RankingService } from '../../servicios/ranking-service/ranking.service';
import { Ranking } from '../../../modelos/ranking';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit {

  public rankings: any[] = [];


  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.cargarRanking();
  }

  cargarRanking(): void {
  this.rankingService.getRankings().subscribe({
    next: (response) => {
      console.log('Ranking cargado:', response);
      this.rankings = response.data.map((r: any) => ({
        ...r,
        id: r._id,// <- Aquí se soluciona
        editando: false
      }));
    },
    error: (error) => {
      console.error('Error al cargar el ranking:', error);
    }
  });
}


activarEdicion(r: any) {
  r.editando = true;
}

cancelarEdicion(r: any) {
  r.editando = false;
  this.cargarRanking(); // recarga los datos originales
}

guardarCambios(r: any) {
  this.rankingService.updateRanking(r.id, r).subscribe({
    next: (data) => {
      console.log(`Jugador con ID ${r.id} modificado`);
      r.editando = false;
    },
    error: (error) => {
      console.error('Error al modificar jugador:', error);
    }
  });
}



  eliminarJugador(id: number) {
    console.log(`Jugador con ID ${id} eliminado`);

    this.rankingService.removeFromRankings(id).subscribe(
      (data: any) => {
        this.rankings = this.rankings.filter(r => r.id !== id);
        alert('Jugador eliminado correctamente');
        this.rankings.sort((a, b) => b.puntuacion - a.puntuacion);
        this.rankings = [...this.rankings];

        localStorage.setItem('usuariosPuntuacion', JSON.stringify(this.rankings));
      },
      ( error :any) => {
        console.error('Error al eliminar jugador:', error);
      }
    );
  }

modificarJugador(r: Ranking): void {
  console.log('ID del jugador:', r.id);
  console.log('Jugador completo:', r);

  this.rankingService.updateRanking(r.id, r).subscribe(
    (data: Ranking) => {
      const index = this.rankings.findIndex(x => x.id === r.id);
      if (index !== -1) {
        this.rankings[index] = data;
        this.rankings.sort((a, b) => b.puntuacion - a.puntuacion);
        localStorage.setItem('usuariosPuntuacion', JSON.stringify(this.rankings));
        console.log(`Jugador con ID ${r.id} modificado`);
      }
    },
    error => {
      console.error('Error al modificar jugador:', error);
    }
  );
}


}
