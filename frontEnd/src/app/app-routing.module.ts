import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { ContactsComponent } from './contacts/contacts.component'
import { AuthGuard } from './providers/auth/auth.guard'
import { LoggedGuard } from './providers/auth/logged.guard'
const routes: Routes = [
  { component: LoginComponent, path: '',canActivate: [LoggedGuard] },
  { component: ContactsComponent, path: 'contacts',canActivate: [AuthGuard],}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
