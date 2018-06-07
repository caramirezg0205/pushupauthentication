import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBar } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login.component';

const routes = [
    {
        path     : 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

     
    ]
})
export class LoginModule
{
}
