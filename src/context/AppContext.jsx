import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { INITIAL_PRODUCTS, INITIAL_PROMO_CODES, STORE_LOCATION } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language state
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'uz');
  const t = translations[lang] || translations.uz;

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  // 2. Dark/Light Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 3. User Authentication state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('app_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (usernameOrPhone, password) => {
    if (
      (usernameOrPhone === 'admin' || usernameOrPhone === '+998901234567') &&
      password === 'admin123'
    ) {
      const adminUser = { username: usernameOrPhone, name: 'System Admin', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('app_user', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    } else {
      const normalUser = { username: usernameOrPhone, name: usernameOrPhone, role: 'user' };
      setUser(normalUser);
      localStorage.setItem('app_user', JSON.stringify(normalUser));
      return { success: true, user: normalUser };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('app_user');
  };

  // 4. Products CRUD state
  const FALLBACK_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop";

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('app_products');
    const loaded = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    return loaded.map(p => {
      if (!p.image || p.image.includes('1583863788434') || p.image.includes('1609592424074')) {
        return { ...p, image: FALLBACK_PRODUCT_IMAGE };
      }
      return p;
    });
  });

  useEffect(() => {
    localStorage.setItem('app_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProd) => {
    const created = {
      ...newProd,
      id: 'prod_' + Date.now(),
      rating: newProd.rating || 5.0,
      reviewsCount: newProd.reviewsCount || 1,
      stock: Number(newProd.stock) || 10,
      price: Number(newProd.price)
    };
    setProducts(prev => [created, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // 5. Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('app_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('app_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const clearWishlist = () => setWishlist([]);

  // 6. Cart state & Promo Code
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('app_cart');
    const loadedCart = saved ? JSON.parse(saved) : [];
    return loadedCart.map(item => {
      if (!item.product?.image || item.product.image.includes('1583863788434') || item.product.image.includes('1609592424074')) {
        return {
          ...item,
          product: {
            ...item.product,
            image: FALLBACK_PRODUCT_IMAGE
          }
        };
      }
      return item;
    });
  });

  useEffect(() => {
    localStorage.setItem('app_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Promo Code handling
  const [appliedPromo, setAppliedPromo] = useState(null);

  const applyPromoCode = (codeStr) => {
    const codeUpper = codeStr.trim().toUpperCase();
    const found = INITIAL_PROMO_CODES.find(p => p.code === codeUpper);
    if (found) {
      setAppliedPromo(found);
      return { success: true, message: t.promo_applied, promo: found };
    }
    return { success: false, message: t.invalid_promo };
  };

  const removePromo = () => setAppliedPromo(null);

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discountAmount = (subtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.fixedDiscount) {
      discountAmount = Math.min(subtotal, appliedPromo.fixedDiscount);
    }
  }

  const deliveryFee = subtotal > 500 || cart.length === 0 ? 0 : 15;
  const totalAmount = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? deliveryFee : 0));

  // 7. Orders state & Telegram integration
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('app_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('app_orders', JSON.stringify(orders));
  }, [orders]);

  const [telegramConfig, setTelegramConfig] = useState(() => {
    const saved = localStorage.getItem('app_telegram_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        botToken: '8823235791:AAEOLjLhNRfFw9xp7quwlfucSXEpL8fCtc8',
        chatId: parsed.chatId && parsed.chatId !== '123456789' && parsed.chatId !== '@Kitobchalar_bot' ? parsed.chatId : '8170197389'
      };
    }
    return { botToken: '8823235791:AAEOLjLhNRfFw9xp7quwlfucSXEpL8fCtc8', chatId: '8170197389' };
  });



  // Telegram delivery log state
  const [telegramLogs, setTelegramLogs] = useState(() => {
    const saved = localStorage.getItem('app_telegram_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const saveTelegramConfig = (config) => {
    setTelegramConfig(config);
    localStorage.setItem('app_telegram_config', JSON.stringify(config));
  };

  const sendTelegramMessage = async (text, inlineKeyboard = null, photoUrl = null) => {
    if (!telegramConfig.botToken || !telegramConfig.chatId) {
      return { success: false, error: "Bot token yoki Chat ID belgilanmagan" };
    }

    try {
      let endpoint = `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`;
      let payload = {
        chat_id: telegramConfig.chatId,
        parse_mode: 'HTML'
      };

      // If photoUrl is provided, attempt sendPhoto endpoint first
      if (photoUrl && typeof photoUrl === 'string' && photoUrl.startsWith('http')) {
        endpoint = `https://api.telegram.org/bot${telegramConfig.botToken}/sendPhoto`;
        payload.photo = photoUrl;
        payload.caption = text.length > 1024 ? text.substring(0, 1020) + '...' : text;
      } else {
        payload.text = text;
        payload.disable_web_page_preview = false;
      }

      if (inlineKeyboard) {
        payload.reply_markup = {
          inline_keyboard: inlineKeyboard
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      // Fallback to text message if photo URL failed
      if (!data.ok && photoUrl) {
        return sendTelegramMessage(text, inlineKeyboard, null);
      }

      const logEntry = {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleString('uz-UZ'),
        status: data.ok ? 'success' : 'error',
        details: data.ok ? (photoUrl ? 'Rasm va xabar muvaffaqiyatli yuborildi' : 'Muvaffaqiyatli yuborildi') : (data.description || 'Nomaʼlum xatolik')
      };

      setTelegramLogs(prev => [logEntry, ...prev.slice(0, 49)]);
      localStorage.setItem('app_telegram_logs', JSON.stringify([logEntry, ...telegramLogs.slice(0, 49)]));

      return { success: data.ok, data, error: data.description };
    } catch (err) {
      if (photoUrl) {
        return sendTelegramMessage(text, inlineKeyboard, null);
      }
      const logEntry = {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleString('uz-UZ'),
        status: 'error',
        details: 'Tarmoq xatosi: ' + err.message
      };
      setTelegramLogs(prev => [logEntry, ...prev.slice(0, 49)]);
      return { success: false, error: err.message };
    }
  };

  const placeOrder = async (customerDetails) => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleString('uz-UZ');
    
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      formattedDate: orderDate,
      customer: customerDetails,
      items: [...cart],
      subtotal,
      discountAmount,
      deliveryFee,
      totalAmount,
      promo: appliedPromo ? appliedPromo.code : null,
      status: 'status_pending'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Format rich HTML message for Telegram Bot notification
    let orderText = `🛒 <b>YANGI BUYURTMA #${orderId}</b>\n`;
    orderText += `📅 <i>Sana: ${orderDate}</i>\n\n`;
    orderText += `👤 <b>Mijoz:</b> ${customerDetails.fullName}\n`;
    orderText += `📞 <b>Tel:</b> <code>${customerDetails.phone}</code>\n`;
    orderText += `📍 <b>Manzil:</b> ${customerDetails.address}\n`;
    orderText += `💳 <b>To'lov turi:</b> <code>${customerDetails.paymentMethod.toUpperCase()}</code>\n\n`;
    orderText += `📦 <b>Mahsulotlar ro'yxati:</b>\n`;

    cart.forEach((item, i) => {
      orderText += `${i + 1}. <b>${item.product.title}</b>\n   └ ${item.quantity} dona × $${item.product.price} = <b>$${(item.product.price * item.quantity).toFixed(2)}</b>\n`;
    });

    if (appliedPromo) {
      orderText += `\n🎟 <b>Promokod:</b> <code>${appliedPromo.code}</code> (-$${discountAmount.toFixed(2)})\n`;
    }
    
    orderText += `🚚 <b>Yetkazish:</b> ${deliveryFee === 0 ? 'BEPUL' : '$' + deliveryFee}\n`;
    orderText += `💰 <b>JAMI TO'LOV:</b> <code>$${totalAmount.toFixed(2)}</code>`;

    // Clean phone number for tel: link
    const cleanPhone = customerDetails.phone.replace(/[^0-9+]/g, '');

    const inlineButtons = [
      [
        { text: "📞 Mijozga qo'ng'iroq", url: `tel:${cleanPhone}` },
        { text: "📍 Xaritada izlash", url: `https://maps.google.com/?q=${encodeURIComponent(customerDetails.address)}` }
      ],
      [
        { text: "🛍️ Saytga o'tish", url: window.location.origin }
      ]
    ];

    const firstProductImage = cart.length > 0 ? cart[0].product.image : null;
    const telegramRes = await sendTelegramMessage(orderText, inlineButtons, firstProductImage);

    clearCart();
    return { ...newOrder, telegramSent: telegramRes.success };
  };

  // 8. Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('newest');

  return (
    <AppContext.Provider
      value={{
        lang,
        changeLanguage,
        t,
        theme,
        toggleTheme,
        user,
        login,
        logout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromo,
        subtotal,
        discountAmount,
        deliveryFee,
        totalAmount,
        orders,
        placeOrder,
        telegramConfig,
        saveTelegramConfig,
        sendTelegramMessage,
        telegramLogs,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        storeLocation: STORE_LOCATION
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
