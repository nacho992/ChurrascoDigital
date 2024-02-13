import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../services/auth/auth.service';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    RouterLink, 
    RouterLinkActive,
    MenuModule,
    TooltipModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})

export class ToolbarComponent implements OnInit {
  
  private authService = inject(AuthService);
  private router = inject(Router)

  ngOnInit() {
    
  }

  public signOut(){
    this.authService.signOut();
    this.router.navigate(['/login'])
  }
}
