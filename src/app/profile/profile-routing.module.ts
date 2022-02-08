import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../authguard.guard';
import { LoginComponent } from './login/login.component'; 
import { RegisterComponent } from './register/register.component';  
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
const routes: Routes = [
  
  { 
    path : 'login' , component : LoginComponent 
  },  
  { 
    path : 'register' , component : RegisterComponent 
  },
  { 
    path : 'userdetails' , component : UserDetailsComponent ,canActivate : [AuthguardGuard]
  },
  { 
    path : 'edituserdetails/:id' , component : EditUserDetailsComponent ,canActivate : [AuthguardGuard]
  }
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
