# 🚀 VOV SHOP - Modern E-Commerce Platform (React 19 + Tailwind CSS)

Professional, breathtaking, and feature-rich online shopping web application built with **React**, **Tailwind CSS**, **React Router**, **Leaflet Maps**, and **Telegram Bot Integration**.

---

## ✨ Features Checklist (Barcha Talab Qilingan Funksiyalar)

1. 🌐 **Uzbek / Russian / English (uz, ru, en)**: Complete 3-language internationalization with instant switching.
2. 🌙 **Dark / Light Mode**: Smooth theme toggling with persistent dark/light state in `localStorage` and luxury glassmorphism aesthetics.
3. 🗺️ **React + Routes**: Multi-page navigation (`/`, `/shop`, `/wishlist`, `/cart`, `/about`, `/admin`).
4. 🎨 **Tailwind CSS v4**: Modern utility-first styles with gradients, custom scrollbars, and responsive UI.
5. 📄 **Landing Page (5 Core Pages + Admin)**:
   - **Bosh sahifa (Home)**: Hero banner, featured categories, live flash sale timer, best sellers, feature highlights.
   - **Katalog (Shop)**: Category filters, price sliders, in-stock toggle, search bar, and sorting controls.
   - **Sevimlilar (Wishlist)**: Quick add/remove favorites with 1-click move all to cart.
   - **Savat & Checkout (Cart)**: Interactive quantity editor, promo code discounts, delivery details, and Telegram order dispatch.
   - **Biz haqimizda & Xarita (About & Map)**: Leaflet interactive store location map in Tashkent and feedback form.
   - **Admin Panel**: Sales analytics, Product CRUD, Order tracking, and Telegram Bot setup.
6. 🛠️ **Admin Panel + Dashboard**: Complete statistics dashboard and management interface.
7. 🤖 **Telegram Bot Integration**: Orders are formatted and sent directly to Telegram Bot API with real-time test connection.
8. 💾 **LocalStorage Persistence**: Cart, Wishlist, Custom Products, Orders, Theme, Language, and Telegram Bot settings persist across reloads.
9. ➕ **Mahsulot Qo'shish, Tahrirlash, O'chirish**: Full CRUD support for products in Admin Panel.
10. ❤️ **Sevimlilar (Izbranniy)**: Wishlist system with animated heart badges.
11. 🏷️ **Savatga Qo'shish + Promokod**: Discount codes (`VOV2026` -20%, `TEGO50` -$50, `SUPER10` -10%).
12. 🔐 **Login (Username/Phone + Password)**: Auth modal supporting username or phone number + password login (with demo admin auto-fill).
13. 🛒 **Online Sotiladigan Magazin**: Complete order checkout workflow (Payme, Click, Cash on Delivery).
14. 🐙 **GitHub + Vercel Ready**: Pre-configured `vercel.json` and git repository structure.
15. 🔍 **Real-time Search**: Instant product search across titles and descriptions.
16. ⚡ **Filtr & Sort**: Category filter, price range min/max, stock status, sorting by price low/high/rating/newest.
17. 📍 **Xaritada Joylashuvi**: Interactive Leaflet Map showing store coordinates in Tashkent with directions link.

---

## 💻 Local Development (Mahalliy Ishga Tushirish)

```bash
# 1. Dependensiyani o'rnatish
npm install

# 2. Ishga tushirish (Dev server)
npm run dev
```

---

## 🚀 GitHub va Vercel'ga Joylash (Deployment Guide)

### 1. GitHub Repository Yaratish
```bash
git init
git add .
git commit -m "Initial commit - VOV SHOP E-Commerce Platform"
git branch -M main
git remote add origin https://github.com/USERNAME/magazin-shop-2.git
git push -u origin main
```

### 2. Vercel'ga Yuklash
1. [Vercel.com](https://vercel.com) ga kiring va GitHub hisobingiz orqali login qiling.
2. **"Add New Project"** tugmasini bosing va `magazin-shop-2` repozitoriyasini tanlang.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. **Deploy** tugmasini bosing! ✨
