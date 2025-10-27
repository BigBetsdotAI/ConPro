import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home.component';
import { ContactComponent } from './app/components/contact/contact.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
