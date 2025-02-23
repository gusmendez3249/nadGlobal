import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Auto {
  id: number;
  marca: string;
  modelo: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  private apiUrl = 'https://tudominio.com/api/autos';  // Cambia por la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los autos
  getAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.apiUrl);
  }

  // Agregar un auto
  agregarAuto(auto: Auto): Observable<Auto> {
    return this.http.post<Auto>(this.apiUrl, auto);
  }

  // Eliminar un auto
  eliminarAuto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Editar un auto
  editarAuto(auto: Auto): Observable<Auto> {
    return this.http.put<Auto>(`${this.apiUrl}/${auto.id}`, auto);
  }

  // Buscar autos por marca
  buscarAutos(marca: string): Observable<Auto[]> {
    return this.http.get<Auto[]>(`${this.apiUrl}?marca=${marca}`);
  }
}
