import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';



@NgModule({
  declarations: [ProfileComponent, LoginPageComponent, SignupPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [LoginPageComponent, SignupPageComponent]
})
export class ProfileModule { }
