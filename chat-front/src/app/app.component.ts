import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./component/navbar/navbar.component";
import {SessionService} from "./service/session.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat-front';
  private sessionService: SessionService = inject(SessionService);
  ngOnInit(){
    this.sessionService.initSession();
    if (!this.sessionService.isAuthenticated()) {
      localStorage.clear()
      this.sessionService.router.navigate(['/login']);
    }
  }
}
