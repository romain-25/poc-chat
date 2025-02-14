import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    RouterLink,
    MatButton
  ]
})
export class HomeComponent{
}
