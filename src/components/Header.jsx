import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Search,
  User,
  ShieldCheck,
  MapPin,
  Globe,
  Menu,
  X,
  Sparkles,
  Zap,
  Maximize,
  Minimize
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';

export default function Header() {
  const {
    t,
    lang,
    changeLanguage,
    theme,
    toggleTheme,
    user,
    logout,
    wishlist,
    cart,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch((err) => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch((err) => console.log(err));
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/shop', label: t.shop },
    { path: '/about', label: t.about },
    { path: '/cart', label: t.cart },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ path: '/admin', label: t.admin });
  }

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs md:text-sm py-1.5 px-4 font-medium flex items-center justify-between shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 animate-pulse text-yellow-300" />
            <span>{t.hero_badge} — <strong>VOV2026</strong> promokodi orqali 20% chegirma oling!</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Toshkent, Amir Temur 108</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Telegram Bot integratsiyasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <div className="glass-nav border-b border-gray-200 dark:border-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                VOV SHOP
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 dark:text-gray-400">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md relative"
          >
            <input
              type="text"
              placeholder={t.search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-gray-100 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 ${location.pathname === link.path
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400 pb-0.5'
                    : 'text-gray-700 dark:text-gray-300'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 active:scale-95"
              title={isFullscreen ? "To'liq ekrandan chiqish" : "To'liq ekran rejimiga o'tish"}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-indigo-500" />
              ) : (
                <Maximize className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span>{lang}</span>
              </button>
              {langDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  {[
                    { code: 'uz', name: "O'zbek" },
                    { code: 'ru', name: 'Русский' },
                    { code: 'en', name: 'English' }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        changeLanguage(l.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-gray-700 ${lang === l.code ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-gray-700/50' : 'text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      {l.name}
                      {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 active:scale-95"
              title="Mavzuni almashtirish"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition active:scale-95"
              title={t.wishlist}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition active:scale-95 shadow-md shadow-indigo-500/20"
              title={t.cart}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-900 shadow">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* User Auth / Admin Button */}
            {user ? (
              <div className="flex items-center gap-1 bg-indigo-50 dark:bg-gray-800 border border-indigo-200 dark:border-gray-700 rounded-xl px-2.5 py-1">
                {user.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                ) : (
                  <User className="w-4 h-4 text-indigo-500" />
                )}
                <span className="text-xs font-bold truncate max-w-[80px] dark:text-white">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="ml-1 text-[10px] font-semibold text-rose-500 hover:underline"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.login}</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-800 space-y-3 bg-white dark:bg-gray-900 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 dark:text-white"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${location.pathname === link.path
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {!user && (
                <button
                  onClick={() => {
                    setIsAuthOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow"
                >
                  <User className="w-4 h-4" />
                  <span>{t.login}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </header>
  );
}
