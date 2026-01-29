import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Features from './components/Features';
import NutriScan from './pages/NutriScan';
import logo from './assets/logo.png';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <img
            src={logo}
            alt="KitchenElite Logo"
            className="h-10 w-10 object-contain rounded-full border border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
          />
          <h1 className="text-2xl font-bold text-white">
            Kitchen<span className="text-emerald-400">ELITE</span>
          </h1>

          {/* Links */}
          <ul className="hidden md:flex space-x-8 text-white font-medium">
            <li>
              <Link to="/" className="hover:text-emerald-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-emerald-400">
                Features
              </Link>
            </li>
            <li className="hover:text-emerald-400 cursor-pointer">Recipes</li>
            <li className="hover:text-emerald-400 cursor-pointer">About</li>
            <li className="hover:text-emerald-400 cursor-pointer">Contact</li>
          </ul>

          {/* Button */}
          <button className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-2 rounded-lg font-semibold transition">
            Get Started
          </button>
        </div>
      </nav>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/nutriscan" element={<NutriScan />} />
      </Routes>
    </BrowserRouter>
  );
}
