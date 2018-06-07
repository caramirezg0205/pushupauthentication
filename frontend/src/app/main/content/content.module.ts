import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseContentComponent } from 'app/main/content/content.component';
import { ParametrosComponent } from 'app/main/content/parametros/parametros.component'
import { LoginComponent } from './authentication/login/login.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatChipsModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HomeService } from './home/home.services';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CdkTableModule } from '@angular/cdk/table';
import { UsuariosService } from './usuarios/usuarios.services';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { UsuarioDetalleService } from './usuario-detalle/usuario-detalle.service';

const routes: Routes = [
    {
        path      : 'login',
        component: LoginComponent
    },
    {
        path      : 'parametros',
        component: ParametrosComponent
    },
    {
        path      : 'home',
        component: HomeComponent
    },
    {
        path      : 'usuarios',
        component: UsuariosComponent,
        resolve : {
            data: UsuariosService
        }
    },
    {
        path     : 'usuarios/:id',
        component: UsuarioDetalleComponent
    },
];

@NgModule({
    declarations: [
        FuseContentComponent,
        ParametrosComponent,
        LoginComponent,
        HomeComponent,
        UsuariosComponent,
        UsuarioDetalleComponent
    ],
    imports     : [
        RouterModule.forRoot(routes),
        FuseSharedModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatIconModule,
        MatTabsModule,
        MatChipsModule,
        MatTableModule,
        MatPaginatorModule,
        CdkTableModule,
        MatSortModule,
        ChartsModule,
        NgxChartsModule,

        FuseSharedModule
    ],
    providers: [
        HomeService, 
        UsuariosService,
        UsuarioDetalleService
    ],
    exports: [
        FuseContentComponent
    ]
})
export class FuseContentModule
{
}
