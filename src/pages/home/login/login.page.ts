import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonBackButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, FormsModule,
    IonButtons, IonBackButton
  ],
})
export class LoginPage
{
  email = '';
  password = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async login() {
    try {
      await this.supabase.signIn(this.email, this.password);
      alert('Login successful!');
      this.router.navigate(['/home']);
    } catch (err: any) {
      alert(err.message);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
