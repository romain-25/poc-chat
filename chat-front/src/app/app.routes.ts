
import {ChatComponent} from "./component/chat/chat.component";
import {RegisterComponent} from "./component/register/register.component";
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatComponent },
  // { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
];
