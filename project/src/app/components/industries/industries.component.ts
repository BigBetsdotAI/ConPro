import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <section id="industries" class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span class="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">Industries</span> We Serve
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized expertise in transforming key industries with AI and technology
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <app-card
            *ngFor="let industry of industries"
            [iconSvg]="industry.iconSvg"
            [title]="industry.title"
            [description]="industry.description"
            [gradient]="industry.gradient"
            [photoUrl]="industry.photoUrl"
          />
        </div>
      </div>
    </section>
  `
})
export class IndustriesComponent {
  industries = [
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>',
      title: 'Healthcare',
      description: 'Transform patient care with AI-powered diagnostics, treatment recommendations, and operational efficiency solutions.',
      gradient: 'from-blue-500 to-cyan-600',
      photoUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11.5 12 7l3 4 4-4"/></svg>',
      title: 'Banking',
      description: 'Modernize financial services with intelligent fraud detection, risk assessment, and personalized customer experiences.',
      gradient: 'from-blue-500 to-cyan-600',
      photoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80'
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>',
      title: 'Insurance',
      description: 'Optimize claims processing, underwriting, and policy management with advanced AI and automation technologies.',
      gradient: 'from-blue-500 to-cyan-600',
      photoUrl: 'https://www.insuranceneighbor.com/wp-content/uploads/sites/2939/2020/02/Life-Insurance-Concept-Family.jpg'
    }
  ];
}
