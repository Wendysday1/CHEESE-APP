import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonBackButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, FormsModule,
    IonButtons, IonBackButton
  ],
})
export class RegisterPage {
  fullName = '';
  email = '';
  password = '';
  avatarFile?: File;

  constructor(private supabase: SupabaseService, private router: Router) {}

  onFileChange(event: any) {
    this.avatarFile = event.target.files[0];
  }

  async register() {
    try {
      const user = await this.supabase.signUp(this.email, this.password);

      let avatarUrl = '';
      if (this.avatarFile) {
        avatarUrl = await this.supabase.uploadAvatar(this.avatarFile);
      }

      await this.supabase.createProfile(user.id, this.fullName, avatarUrl);

      alert('Registration successful!');
      this.router.navigate(['/home']);
    } catch (err: any) {
      alert(err.message);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}


