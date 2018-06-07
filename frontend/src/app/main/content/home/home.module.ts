import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatSidenav, MatSidenavModule, MatInputModule } from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.services';


const routes: Routes = [
    {
        path     : '**',
        component: HomeComponent,
    }
];

@NgModule({
    declarations: [
        HomeComponent,
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,

        ChartsModule,
        NgxChartsModule,

        FuseSharedModule,
        FuseWidgetModule,
        
    ],
    providers: [HomeService]
})
export class HomeModule
{
}

