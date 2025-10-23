import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
  <section id="services" class="py-20 bg-white services-warm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span class="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI and technology solutions tailored to your business needs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <app-card
            *ngFor="let service of services"
            [iconSvg]="service.iconSvg"
            [title]="service.title"
            [description]="service.description"
            [gradient]="service.gradient"
          />
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
  services = [
    {
      iconSvg: '<svg xmlns="https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/f77d152d-2a36-54a4-803a-ba41d57d9abc/63259c91-bdc3-513a-9142-1b1f89a3d3e7.jpg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/></svg>',
      title: 'Agent AI',
      description: 'Build intelligent autonomous agents that can understand, reason, and take actions to solve complex business problems.',
      gradient: 'from-blue-500 to-cyan-600',
      photoUrl: 'https://techvidvan.com/tutorials/wp-content/uploads/2025/03/ai-agents.webp'
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
      title: 'Gen AI',
      description: 'Harness the power of generative AI to create content, automate processes, and unlock new possibilities for your business.',
      gradient: 'from-blue-500 to-indigo-600',
      photoUrl: 'https://blog.bismart.com/hubfs/IA%20Generativa%20e%20IA%20General.jpg'
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>',
      title: 'MLOps',
      description: 'Streamline your machine learning operations with robust pipelines, monitoring, and deployment strategies.',
  gradient: 'from-blue-600 to-cyan-700'
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16 17 6"/><path d="m17 16 4-4"/></svg>',
      title: 'Data Science',
      description: 'Transform raw data into actionable insights with advanced analytics, predictive modeling, and visualization.',
  gradient: 'from-blue-500 to-indigo-600'
    },
    {
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      title: 'Software Engineering',
      description: 'Build scalable, maintainable software solutions with modern development practices and cutting-edge technologies.',
  gradient: 'from-blue-500 to-cyan-600'
    }
  ];
}
