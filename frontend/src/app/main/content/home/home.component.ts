import { Component, OnInit, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subscription } from 'rxjs';
import { HomeService } from './home.services';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: fuseAnimations
})
export class HomeComponent implements OnInit {

  sistemas: any[];
  filteredSistemas: any[];
  searchTerm = '';

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    
     this.homeService.getSistemas().then(sistemas=>{
      this.sistemas = this.filteredSistemas = sistemas;
     })
  }
  
  convertTimeAgo(fecha){
    moment.locale('es')
    return moment(fecha).fromNow()
  }

  filterSistemasByTerm() {
    const searchTerm = this.searchTerm.toLowerCase();
    
    if (searchTerm === '') {
      this.filteredSistemas = this.sistemas;
    } else {
      this.filteredSistemas = this.sistemas.filter((sistema) => {
        return sistema.sistema.toLowerCase().includes(searchTerm)
      });
    }
  }
}
