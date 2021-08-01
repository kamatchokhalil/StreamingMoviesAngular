import { RegistrationModuleModule } from './registration/registration-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from 'app/main/page/authentifaction/login/login.module';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
  ],
  imports: [
    LoginModule,
    RegistrationModuleModule,
    CommonModule
  ]
})
export class PageModule { }
