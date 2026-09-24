import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MenuPage } from './pages/MenuPage';
import { ChaiCoffeePage } from './pages/ChaiCoffeePage';
import { ShakesDessertsPage } from './pages/ShakesDessertsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ChaiSommelierModal } from './components/ChaiSommelierModal';
import { MenuItem } from './data/menuData';
import { Sparkles } from 'lucide-react';

export function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [sommelierOpen, setSommelierOpen] = useState<boolean>(false);
  const [sommelierQuery, setSommelierQuery] = useState<string>('');
  const [sommelierItem, setSommelierItem] = useState<string>('');

  // Sync hash routing with activePage
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = [
        'home',
        'about',
        'menu',
        'chai-coffee',
        'shakes-desserts',
        'gallery',
        'contact',
      ];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSommelierWithItem = (itemName: string) => {
    setSommelierItem(itemName);
    setSommelierQuery(`What pairs best with ${itemName}?`);
    setSommelierOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F0D8] font-sans antialiased selection:bg-[#F4B62F] selection:text-[#111111] flex flex-col justify-between">
      {/* Top Bar Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenSommelier={() => {
          setSommelierQuery('');
          setSommelierItem('');
          setSommelierOpen(true);
        }}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenSommelier={() => setSommelierOpen(true)}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {activePage === 'menu' && (
          <MenuPage
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenSommelier={() => setSommelierOpen(true)}
            onNavigateToContact={() => navigateTo('contact')}
          />
        )}

        {activePage === 'chai-coffee' && (
          <ChaiCoffeePage
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenSommelier={() => setSommelierOpen(true)}
          />
        )}

        {activePage === 'shakes-desserts' && (
          <ShakesDessertsPage
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenSommelier={() => setSommelierOpen(true)}
          />
        )}

        {activePage === 'gallery' && <GalleryPage />}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Floating Action Button for AI Sommelier */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setSommelierQuery('');
            setSommelierItem('');
            setSommelierOpen(true);
          }}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#181818]/90 hover:bg-[#202020] text-[#F4B62F] border border-[#F4B62F]/50 hover:border-[#F4B62F] rounded-full shadow-2xl backdrop-blur-md transition-all transform hover:scale-105 group"
          title="Chai Sommelier: Ask AI for flavor pairings"
        >
          <Sparkles className="w-4 h-4 text-[#F4B62F] animate-pulse" />
          <span className="text-xs uppercase font-bold tracking-wider hidden sm:inline text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
            Ask Sommelier
          </span>
        </button>
      </div>

      {/* Universal Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onOpenSommelierWithItem={handleOpenSommelierWithItem}
        onNavigateToContact={() => {
          setSelectedItem(null);
          navigateTo('contact');
        }}
      />

      {/* AI Sommelier Modal */}
      <ChaiSommelierModal
        isOpen={sommelierOpen}
        onClose={() => setSommelierOpen(false)}
        initialQuery={sommelierQuery}
        initialItem={sommelierItem}
        onSelectMenuItem={(itemId) => {
          setSommelierOpen(false);
          navigateTo('menu');
        }}
      />
    </div>
  );
}

export default App;
