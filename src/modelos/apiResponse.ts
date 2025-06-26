import { Pokemon } from './pokemon';

export interface apiResponse {
    data: Pokemon[],
    mensaje: string
  }