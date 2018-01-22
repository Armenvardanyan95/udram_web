import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentMessageModule } from '@covalent/core'
import { TableModule } from 'primeng/table';
import { InputTextModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { AdminLoginComponent } from './admin-login/admin-login.component';

import { Environment } from '../common/environment';

import { environment } from '../../environments/environment';
import {AdminUserService} from './admin-user-service.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: AdminLoginComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    CovalentMessageModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule
  ],
  declarations: [AdminLoginComponent, DashboardComponent],
  providers: [{provide: Environment, useValue: environment}, AdminUserService]
})
export class AdminModule { }
