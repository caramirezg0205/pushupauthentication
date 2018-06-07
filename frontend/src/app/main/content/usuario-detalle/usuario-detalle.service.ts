import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDetalleService {

  constructor(private http: HttpClient) { }

  public getSistemasByUserId(fk_usuario,action: (data: any) => any, actionError?: (data: any) => any) {
    return this.http.get(`${environment.api_url}/api/usuariosistemas/getSistemasByFkUsuario?fk_usuario=${fk_usuario}`).subscribe(
        data => action(data),
        error => console.log(error))
  }
}