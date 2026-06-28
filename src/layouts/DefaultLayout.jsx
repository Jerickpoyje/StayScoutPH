import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function DefaultLayout() {
  return (
    <div className="min-h-screen bg-surface text-slate-950">
      <Navbar />
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
