import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

function HomePage() {
  return (
    <div className="min-h-screen bg-space-black pb-20 lg:pb-0">
      <Header />
      <Hero />
      <Services />
      <About />
      <Features />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
