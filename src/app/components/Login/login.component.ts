import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../../models/Interface/Login.interface';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [InputTextModule,ReactiveFormsModule,FormsModule,NgIf,RouterModule]
})
export class LoginComponent implements OnInit {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public formLogin!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm(){
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public onLogin(){
    if (this.formLogin.valid) 
      this.authService.login(this.formLogin.value)
                      .subscribe(res=>{
                        if (res) this.router.navigate(['/product-list']);
                      });
  }

}
