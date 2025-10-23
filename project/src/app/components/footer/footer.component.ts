import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
  <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">
              A2 Intelligence
            </div>
            <p class="text-gray-300 text-sm leading-relaxed">
              Empowering businesses with cutting-edge AI solutions and intelligent automation.
            </p>
            <!-- Social media icons removed: only present in hero section -->
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Services</h3>
            <ul class="space-y-2">
              <li><a href="#services" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Agent AI</a></li>
              <li><a href="#services" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Gen AI</a></li>
              <li><a href="#services" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">MLOps</a></li>
              <li><a href="#services" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Data Science</a></li>
              <li><a href="#services" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Software Engineering</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Products</h3>
            <ul class="space-y-2">
              <li><a href="#products" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">A2 Foundry</a></li>
              <li><a href="#products" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Agentic AI</a></li>
              <li><a href="#products" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">CCG</a></li>
              <li><a href="#products" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Fraud Detection</a></li>
              <li><a href="#products" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Next Best Actions</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">About Us</a></li>
              <li><a href="#industries" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Industries</a></li>
              <li><a href="#" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Careers</a></li>
              <li><a href="#contact" class="text-white hover:text-blue-400 transition-colors duration-200 text-sm">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            2025 © All rights reserved by <span class="text-blue-400 font-semibold">A2 Intelligence</span>
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
