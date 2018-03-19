import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule, MatListModule, MatButtonModule, MatCardModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

import { CovalentLayoutModule, CovalentStepsModule, CovalentMessageModule, CovalentFileModule } from '@covalent/core';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PersonalComponent } from './pages/registration/personal/personal.component';
import { AuthComponent } from './pages/registration/auth/auth.component';
import { IdentificationComponent } from './pages/registration/identification/identification.component';
import { AdditionalComponent } from './pages/registration/additional/additional.component';
import { RequestComponent } from './pages/registration/request/request.component';
import { TermsComponent } from './pages/registration/terms/terms.component';
import { ContactsDialogComponent } from './components/contacts-dialog/contacts-dialog.component';

import { UserService } from './common/user.service';
import { StoreService } from './common/store.service';

import { Environment } from './common/environment';
import { environment } from '../environments/environment';
import { SuccessComponent } from './pages/success/success.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import {AuthGuard} from './common/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import {CurrentUserResolverService} from './common/current-user-resolver.service';
import { ErrorComponent } from './pages/error/error.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FilesComponent } from './pages/registration/files/files.component';
import { TermsAndConditionsPageComponent } from './pages/terms-and-conditions-page/terms-and-conditions-page.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'recover', component: ChangePasswordComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: {user: CurrentUserResolverService}},
  {path: 'terms', component: TermsAndConditionsPageComponent},
  {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    PersonalComponent,
    AuthComponent,
    IdentificationComponent,
    AdditionalComponent,
    RequestComponent,
    TermsComponent,
    SuccessComponent,
    ChangePasswordComponent,
    ProfileComponent,
    ErrorComponent,
    PageNotFoundComponent,
    FilesComponent,
    TermsAndConditionsPageComponent,
    ContactsDialogComponent,
    DateSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentMessageModule,
    CovalentFileModule,
    RouterModule.forRoot(routes),
    CookieModule.forRoot()
  ],
  providers: [{provide: Environment, useValue: environment}, UserService, StoreService, AuthGuard, CurrentUserResolverService],
  bootstrap: [AppComponent],
  entryComponents: [ContactsDialogComponent]
})
export class AppModule { }
