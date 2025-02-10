import {Component, inject} from '@angular/core';
import {WebsocketService} from "../../service/chat.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  websocketService: WebsocketService = inject(WebsocketService);
  messages: string[] = [];
  newMessage: string = '';


  ngOnInit(): void {
    this.websocketService.connect();
    // this.websocketService.getMessages().subscribe((message: string) => {
    //   console.log('Message reçu :', message);
    //   this.messages.push(message);
    // });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      console.log('Envoi du message:', this.newMessage);
      this.websocketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
