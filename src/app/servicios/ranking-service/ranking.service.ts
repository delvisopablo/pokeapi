import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector, effect, inject, signal } from '@angular/core';
import { Pokemon } from '../../../modelos/pokemon';
import { Ranking } from '../../../modelos/ranking';



@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private apiUrl = 'http://localhost:8080/api/ranking';
  injector = inject(Injector);
  http = inject(HttpClient);

  // rankings = signal<Ranking[]>([]);

  constructor() {}

  getRankings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getRankingsById(id: string): Observable<Ranking> {
    return this.http.get<Ranking>(`${this.apiUrl}/${id}`);
  }

  saveRankings(data: any): Observable<Ranking> {
  return this.http.post<Ranking>(`${this.apiUrl}`, data);
}


  addToRankings(ranking: any): Observable<any> {
    return this.http.post(this.apiUrl, ranking);
  }

  updateRanking(id: number, ranking: Ranking): Observable<Ranking> {
    return this.http.put<Ranking>(`${this.apiUrl}/${id}`, ranking);
  }

  removeFromRankings(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
