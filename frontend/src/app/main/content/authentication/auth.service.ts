import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  public isLoggedIn(token,action: (data: any) => any, actionError?: (data: any) => any) {
    return this.http.post(`${environment.api_url}/api/usuarios/verifyToken`,token).subscribe(
        data => action(data),
        error => console.log(error))
  }

  public login(data, action: (data: any) => any, actionError?: (data: any) => any) {
    return this.http.post(`${environment.api_url}/api/usuarios/authenticate`, data)
        .subscribe(
            data => action(data),
            error => console.log(error)
        );
  }

  public logout() {
    localStorage.removeItem('authServerToken');
    this.router.navigateByUrl('/login');
  }

  public registrarToken(data, action: (data: any) => any, actionError?: (data: any) => any){
    return this.http.post(`${environment.api_url}/api/tokens`,data).subscribe(
      data => {
        action(data)
      },
      error => {
        console.log(error)
        this.snackBar.open("Lo sentimos ha ocurrido un error","Cerrar")
      }
    )
  }

  public decodeToken(token: string, action: (data: any) => any, actionError?: (data: any) => any){
    return this.http.get(`${environment.api_url}/api/usuarios/decodeToken?token=${token}`).subscribe(data => {
      action(data)
    },
    error => {
      console.log(error)
      this.snackBar.open('Lo sentimos ha ocurrido un error','Cerrar')
    }
    )
  }
}
