import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function WishlistPage() {
  const { t, wishlist, products, clearWishlist, addToCart } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach(p => addToCart(p, 1));
    clearWishlist();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              {t.wishlist_title}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Jami {wishlistProducts.length} ta sevimli mahsulot
            </p>
          </div>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow hover:opacity-90 transition flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.move_all_to_cart}</span>
            </button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-bold text-xs hover:bg-rose-100 transition flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.clear_wishlist}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Wishlist Content */}
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 p-8 space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-gray-700 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
            {t.wishlist_empty}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            O'zingizga yoqqan mahsulotlarning yurakchasini bosib, keyinchalik sotib olish uchun shu yerda saqlab qo'yishingiz mumkin.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs shadow hover:bg-indigo-700 transition"
          >
            <span>{t.continue_shopping}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
