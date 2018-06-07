import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Subscription, fromEvent, BehaviorSubject, Observable, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { UsuariosService } from './usuarios.services';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { FuseUtils } from '@fuse/utils';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    animations: fuseAnimations
})
export class UsuariosComponent implements OnInit {

    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'username', 'nombres', 'apellidos', 'logins'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private usuariosService: UsuariosService) { }

    ngOnInit() {
        this.dataSource = new FilesDataSource(this.usuariosService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup').pipe(
            debounceTime(150),
            distinctUntilChanged()
        ).subscribe(() => {
            if (!this.dataSource) {
                return;
            }

            this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
}

export class FilesDataSource extends DataSource<any>
{
    _filterChange = new BehaviorSubject('');
    _filteredDataChange = new BehaviorSubject('');

    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    constructor(
        private usuariosService: UsuariosService,
        private _paginator: MatPaginator,
        private _sort: MatSort
    ) {
        super();
        this.filteredData = this.usuariosService.usuarios;
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.usuariosService.onUsuariosChanged,
            this._paginator.page,
            this._filterChange,

        ];

        return merge(...displayDataChanges).pipe(map(() => {

            let data = this.usuariosService.usuarios.slice();

            data = this.filterData(data);

            this.filteredData = [...data];

            data = this.sortData(data);

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        }
        ));
    }

    filterData(data) {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'username':
                    [propertyA, propertyB] = [a.username, b.username];
                    break;
                case 'nombres':
                    [propertyA, propertyB] = [a.nombres, b.nombres];
                    break;
                case 'apellidos':
                    [propertyA, propertyB] = [a.apellidos, b.apellidos];
                    break;
                case 'logins':
                    [propertyA, propertyB] = [a.logins, b.logins];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect() {
    }
}