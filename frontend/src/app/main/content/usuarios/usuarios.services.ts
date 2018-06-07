import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable()
export class UsuariosService implements Resolve<any>{
  usuarios: any[];
  onUsuariosChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient){}

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise((resolve, reject) => {
          console.log("here")
          Promise.all([
              this.getUsuarios()
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

  getUsuarios(): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this.http.get(`${environment.api_url}/api/usuarios`)
              .subscribe((response: any) => {
                  this.usuarios = response;
                  this.onUsuariosChanged.next(this.usuarios);
                  resolve(response);
              }, reject);
      });
  }
}
