export const INITIAL_PRODUCTS = [
  {
    id: "p1",
    title: "iPhone 16 Pro Max 256GB Natural Titanium",
    category: "cat_smartphones",
    price: 1399,
    oldPrice: 1549,
    stock: 12,
    rating: 4.9,
    reviewsCount: 48,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    description: "A18 Pro chip, titanium design with Camera Control, 48MP Fusion camera system, and extraordinary battery life.",
    specs: {
      Screen: "6.9-inch Super Retina XDR OLED",
      Chip: "Apple A18 Pro (3nm)",
      Camera: "48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto",
      Battery: "4685 mAh",
      OS: "iOS 18"
    }
  },
  {
    id: "p2",
    title: "Samsung Galaxy S25 Ultra 5G 512GB",
    category: "cat_smartphones",
    price: 1299,
    oldPrice: 1429,
    stock: 8,
    rating: 4.8,
    reviewsCount: 34,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    description: "Snapdragon 8 Elite Processor, Built-in S-Pen, 200MP AI Camera with Galaxy AI features.",
    specs: {
      Screen: "6.8-inch Dynamic AMOLED 2X 120Hz",
      Chip: "Snapdragon 8 Elite for Galaxy",
      Camera: "200MP + 50MP + 10MP + 50MP",
      Battery: "5000 mAh 45W Fast Charging",
      OS: "Android 15 (One UI 7)"
    }
  },
  {
    id: "p3",
    title: "MacBook Pro 16 M3 Max 36GB / 1TB SSD Space Black",
    category: "cat_laptops",
    price: 3499,
    oldPrice: 3799,
    stock: 5,
    rating: 5.0,
    reviewsCount: 19,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    description: "Ultimate workstation power with Apple M3 Max 16-core CPU, 40-core GPU, Liquid Retina XDR display.",
    specs: {
      CPU: "Apple M3 Max 16-core",
      RAM: "36GB Unified Memory",
      Storage: "1TB NVMe SSD",
      Display: "16.2-inch Liquid Retina XDR 120Hz ProMotion",
      Weight: "2.14 kg"
    }
  },
  {
    id: "p4",
    title: "Sony WH-1000XM5 Noise Canceling Headphones",
    category: "cat_audio",
    price: 389,
    oldPrice: 449,
    stock: 18,
    rating: 4.9,
    reviewsCount: 92,
    isFlashSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    description: "Industry-leading noise canceling with two processors and eight microphones for unprecedented sound purity.",
    specs: {
      Battery: "Up to 30 Hours with ANC",
      Connectivity: "Bluetooth 5.2 & Multi-point",
      Drivers: "30mm Precision Engineered",
      Weight: "250g"
    }
  },
  {
    id: "p5",
    title: "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium",
    category: "cat_watches",
    price: 799,
    oldPrice: 899,
    stock: 7,
    rating: 4.9,
    reviewsCount: 27,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop",
    description: "The ultimate sports and adventure watch. S9 SiP with Double Tap gesture, brightest display ever.",
    specs: {
      Case: "49mm Aerospace Titanium",
      Brightness: "3000 nits Peak",
      WaterResistance: "100m (EN13319)",
      Battery: "36 Hours Normal / 72 Hours Low Power"
    }
  },
  {
    id: "p6",
    title: "ASUS ROG Strix SCAR 18 i9-14900HX RTX 4090",
    category: "cat_gaming",
    price: 3899,
    oldPrice: 4199,
    stock: 4,
    rating: 4.9,
    reviewsCount: 15,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",
    description: "Dominant gaming horsepower featuring 18-inch ROG Nebula HDR display, liquid metal cooling, 64GB RAM.",
    specs: {
      CPU: "Intel Core i9-14900HX",
      GPU: "NVIDIA GeForce RTX 4090 16GB",
      RAM: "64GB DDR5 5600MHz",
      Storage: "2TB PCIe 4.0 NVMe SSD"
    }
  },
  {
    id: "p7",
    title: "AirPods Pro 2nd Gen USB-C Active Noise Cancellation",
    category: "cat_audio",
    price: 239,
    oldPrice: 279,
    stock: 25,
    rating: 4.8,
    reviewsCount: 110,
    isFlashSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop",
    description: "H2 chip powered active noise cancellation, Adaptive Audio, and personalized Spatial Audio.",
    specs: {
      Chip: "Apple H2 Headphone Chip",
      Case: "MagSafe Charging Case (USB-C) with Speaker",
      Battery: "Up to 6 hours listening time"
    }
  },
  {
    id: "p8",
    title: "Anker Prime 20,000mAh Power Bank 200W Output",
    category: "cat_accessories",
    price: 119,
    oldPrice: 149,
    stock: 30,
    rating: 4.7,
    reviewsCount: 64,
    isFlashSale: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    description: "Ultra-fast multi-device charging with smart digital display and compact portable body.",
    specs: {
      Capacity: "20,000mAh (72Wh)",
      Output: "Max 200W Combined",
      Ports: "2x USB-C, 1x USB-A"
    }
  }
];

export const INITIAL_PROMO_CODES = [
  { code: "VOV2026", discountPercent: 20, description: "20% Chegirma Ustozlar va Barcha uchun!" },
  { code: "SUPER10", discountPercent: 10, description: "10% Chegirma birinchi xaridga" },
  { code: "TEGO50", fixedDiscount: 50, description: "$50 Maxsus Chegirma" }
];

export const STORE_LOCATION = {
  name: "VOV TECH Flagship Store",
  city: "Tashkent, Uzbekistan",
  address: "Amir Temur shox ko'chasi, 108-uy",
  lat: 41.3323,
  lng: 69.2842,
  phone: "+998 (90) 123-45-67",
  telegram: "@vov_tech_bot"
};
