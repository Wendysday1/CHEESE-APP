import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, CommonModule, IonCard, IonItem, IonLabel, IonThumbnail]
})
export class DevelopersPage {

  developers = [
  {name: 'Arrojado, Lorenzo Miguel',
    image: 'assets/img/lorenzo.jpg',
    description: 'Front-end developer. Focused on UI/UX design and Ionic/Angular integration.',
    experiences: [
      'Angular',
      'C++',
      'Java'
   
    ]
  },
  {
     name: 'Muega, Gabriel Ellis P.',
    image: 'assets/img/ellis.JPG',
    description: 'Lead developer, Backend, and Database. Handles backend integration and database management.',
    experiences: [
      'C++',
      'Java',
      'PHP',
      'Python',
      'HTML'
    ]
  }
];
}
