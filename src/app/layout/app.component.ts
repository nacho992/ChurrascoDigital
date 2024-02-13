import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from '../services/message.service';
import { NotificationHelper } from '../helpers/NotificationHelper';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    ToolbarComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public authService = inject(AuthService)
  title = 'churrasco-proyect';

  private messageService = inject(MessageService)


  ngOnInit(): void {
    this.suscribeMessageService();
  }

  private suscribeMessageService(){
    this.messageService
        .showMensajeOK()
        .subscribe(value => {
          //notificar
          NotificationHelper.showSuccessMessage(value)
        })

    this.messageService
        .showMensajeError()
        .subscribe(value => {
          //notificar
          NotificationHelper.showErrorMessage(value)
        })
  }
}
