import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Location } from '@angular/common';
import { UsuarioDetalleService } from './usuario-detalle.service';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector     : 'fuse-usuario-detalle',
    templateUrl  : './usuario-detalle.component.html',
    styleUrls    : ['./usuario-detalle.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UsuarioDetalleComponent implements OnInit
{
    public sistemas: Sistema []
    displayedColumns = ['select', 'id', 'sistema', 'link'];
    dataSource

    selection = new SelectionModel<Sistema>(true, []);

    constructor(private usuarioDetalleService: UsuarioDetalleService, private route: ActivatedRoute ){}
  
    ngOnInit()
    {
        this.listarSistemasPorUsuario()
       
    }

        /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    private listarSistemasPorUsuario(){
        this.usuarioDetalleService.getSistemasByUserId(this.route.snapshot.paramMap.get('id'), data => {
            this.sistemas = data;
            this.dataSource = new MatTableDataSource<Sistema>(this.sistemas);
            console.log(this.sistemas)
            console.log(this.dataSource)
        })
    }
}
export interface Sistema {
    id: number;
    sistema: string;
    link: string;
}
