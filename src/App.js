import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { Home, About, Services, Products, Testimonials, Careers, CaseStudies, Blog, Solutions, Company, AgenticAIConsulting, ProductStrategy, ProductDevelopment, Privacy, Terms } from './pages';
import CaseStudyDetail from './pages/CaseStudyDetail';
import ChatAgentPage from './pages/ChatAgentPage';
import AdminPage from './pages/AdminPage';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/company" element={<Company />} />
            <Route path="/agentic-ai-consulting" element={<AgenticAIConsulting />} />
            <Route path="/product-strategy" element={<ProductStrategy />} />
            <Route path="/product-development" element={<ProductDevelopment />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/chat-agent" element={<ChatAgentPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
