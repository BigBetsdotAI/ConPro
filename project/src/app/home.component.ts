import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ProductsComponent } from './components/products/products.component';
import { IndustriesComponent } from './components/industries/industries.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeroComponent, ServicesComponent, ProductsComponent, IndustriesComponent, ContactComponent, FooterComponent],
  template: `
    <div class="min-h-screen">
      <app-header />
      <main>
        <app-hero />
        <app-services />
        <app-products />
        <app-industries />
        <app-contact />
      </main>
      <app-footer />
    </div>
  `
})
export class HomeComponent {}
