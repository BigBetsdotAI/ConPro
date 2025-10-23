import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <section #productsSection id="products" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span class="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">Products</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Innovative solutions powered by A2 Intelligence technology
          </p>
        </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 p-2 md:p-4">
          <app-card
            *ngFor="let product of products; let i = index"
            class="mx-2 my-4"
            [iconSvg]="product.iconSvg"
            [title]="product.title"
            [description]="product.description"
            [gradient]="product.gradient"
            [photoUrl]="product.photoUrl"
            [attr.style]="'--i:' + i"
            [class.product-left]="i < 4"
            [class.product-right]="i >= 4"
          />
        </div>
      </div>
    </section>
  `
})
export class ProductsComponent {
  @ViewChild('productsSection', { static: true }) productsSection!: ElementRef<HTMLElement>;
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const el = this.productsSection.nativeElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(el, 'products-in-view');
          document.body.classList.add('products-visible');
        } else {
          this.renderer.removeClass(el, 'products-in-view');
          document.body.classList.remove('products-visible');
        }
      });
    }, { threshold: 0.12 });
    observer.observe(el);
  }
  products = [
    {
      iconSvg: '',
      title: 'A2 Foundry',
      description: 'A comprehensive platform for building, deploying, and managing AI-powered applications at scale.',
      gradient: 'from-blue-500 to-cyan-600',
  photoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80' // AI abstract
    },
    {
      iconSvg: '',
      title: 'Agentic AI',
      description: 'Autonomous AI agents that can perform complex tasks,and interact naturally with users.',
      gradient: 'from-blue-500 to-cyan-600',
  photoUrl: 'https://www.aziro.com/wp-content/uploads/2025/06/Agentic-AI-unnamed-958x480.jpg' // AI network
    },
    {
      iconSvg: '',
      title: 'CCG',
      description: 'Clinical Content Generator for automated healthcare documentation and compliance reporting.',
      gradient: 'from-blue-500 to-cyan-600',
  photoUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80' // Tech healthcare
    },
    {
      iconSvg: 'https://smartxtech.co/wp-content/uploads/2023/10/Blog016-Gen-ai-the-next-generation-of-artificial-intelligence.png.avif',
      title: 'PBMCert',
      description: 'Pharmacy Benefit Management certification and compliance solution for healthcare providers.',
      gradient: 'from-blue-500 to-cyan-600',
  photoUrl: 'https://diplo-media.s3.eu-central-1.amazonaws.com/2025/07/Agentic-AI-cybersecurity-Deloitte-SailPoint-AI-agents.jpg' // Tech compliance
    },
    {
      iconSvg: '',
      title: 'Next Best Actions',
      description: 'AI-driven recommendation engine that predicts optimal next steps for customer engagement.',
      gradient: 'from-blue-500 to-cyan-600',
  photoUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' // AI recommendation
    },
    {
      iconSvg: '',
      title: 'Prior Auth',
      description: 'Streamline prior authorization processes with intelligent automation and real-time decision support.',
      gradient: 'from-blue-500 to-cyan-600',
  photoUrl: 'https://smartxtech.co/wp-content/uploads/2023/10/Blog016-Gen-ai-the-next-generation-of-artificial-intelligence.png.avif' // AI automation
    },
    {
      iconSvg: '',
      title: 'Claims & Contacts',
      description: 'Integrated platform for managing insurance claims and customer communications efficiently.',
      gradient: 'from-blue-500 to-cyan-600',
  photoUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' // Tech claims
    },
    {
      iconSvg: '',
      title: 'Fraud Detection',
      description: 'Advanced AI models to detect and prevent fraudulent activities in real-time across all transactions.',
      gradient: 'from-blue-500 to-cyan-600',
  photoUrl: 'https://www.bankershub.com/cdn/shop/articles/AI-in-Banking-Fraud-Detection.jpg?v=1729112783&width=1600' // AI fraud detection
    },
  ];
}
