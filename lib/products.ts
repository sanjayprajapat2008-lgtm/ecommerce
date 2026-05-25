export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  inStock: boolean;
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "AcousticMax Pro Headphones",
    price: 2999,
    originalPrice: 4999,
    image: "/image-7.png",
    category: "Audio",
    rating: 4.8,
    reviewsCount: 142,
    description: "Immersive studio-grade sound quality featuring hybrid active noise cancellation, smart ambient transparency, and a premium memory foam leather headband. Experience music in its purest form with ultra-low latency wireless connectivity.",
    features: [
      "Hybrid Active Noise Cancellation (up to 40dB)",
      "Ultra-low latency wireless & wired modes",
      "Up to 50 hours of playback on a single charge",
      "Ergonomic fit with breathable mesh headband"
    ],
    specifications: {
      "Driver Size": "40mm Dynamic",
      "Frequency Response": "20Hz - 40kHz",
      "Bluetooth Version": "5.3",
      "Weight": "260g",
      "Charge Port": "USB-C Fast Charging"
    },
    stock: 24,
    inStock: true,
    reviews: [
      {
        id: "rev-1-1",
        userName: "Alex Rivers",
        rating: 5,
        date: "2026-05-12",
        comment: "Absolutely outstanding soundstage. The ANC blocks out everything on my daily train commutes. Best headphones at this price point!"
      },
      {
        id: "rev-1-2",
        userName: "Priya Sharma",
        rating: 4,
        date: "2026-05-18",
        comment: "Very comfortable for long remote work sessions. Battery life easily lasts the whole week."
      }
    ]
  },
  {
    id: "prod-2",
    name: "Vanguard Fit Watch Pro",
    price: 999,
    originalPrice: 1999,
    image: "/image-3.png",
    category: "Wearables",
    rating: 4.5,
    reviewsCount: 88,
    description: "Elevate your health tracking with a brilliant 1.96-inch AMOLED always-on display, precise continuous biometric sensing, GPS tracking, and a premium aircraft-grade aluminum casing. Water-resistant up to 50 meters.",
    features: [
      "1.96\" Always-On AMOLED Touchscreen Display",
      "24/7 Heart Rate, SpO2, and Sleep Analytics",
      "Built-in GPS and 120+ Workout Tracking Profiles",
      "Up to 14 days of robust standby battery life"
    ],
    specifications: {
      "Display Size": "1.96 inch AMOLED",
      "Water Resistance": "5 ATM (50m)",
      "Sensors": "Optical Heart Rate, Accelerometer, Gyroscope, SpO2",
      "Compatibility": "iOS 12+ / Android 8.0+",
      "Strap Material": "Hypoallergenic Liquid Silicone"
    },
    stock: 45,
    inStock: true,
    reviews: [
      {
        id: "rev-2-1",
        userName: "David K.",
        rating: 5,
        date: "2026-04-30",
        comment: "The screen is so bright and crisp! Sleep tracker is remarkably accurate compared to my old trackers."
      }
    ]
  },
  {
    id: "prod-3",
    name: "NeonGlide FPS Gaming Mouse",
    price: 9999,
    originalPrice: 12999,
    image: "/image-4.png",
    category: "Inputs",
    rating: 4.9,
    reviewsCount: 204,
    description: "Designed for competitive esports, the NeonGlide features a cutting-edge 32,000 DPI optical sensor, custom gold-plated optical micro-switches rated for 90 million clicks, and an ultra-lightweight exoskeleton frame weighing just 52 grams.",
    features: [
      "Pro-grade 32,000 DPI adjustable Optical Sensor",
      "Ultra-lightweight 52g exoskeleton design",
      "Zero-latency wireless connection & hyper-flexible cable",
      "Dynamic customizable multi-zone RGB lighting"
    ],
    specifications: {
      "Sensor": "ApexFocus 32K Optical",
      "Weight": "52 grams",
      "Polling Rate": "8000Hz wired / 4000Hz wireless",
      "Switch Type": "90M Click Optical",
      "Battery Life": "Up to 80 hours (RGB off)"
    },
    stock: 12,
    inStock: true,
    reviews: [
      {
        id: "rev-3-1",
        userName: "Siddharth M.",
        rating: 5,
        date: "2026-05-15",
        comment: "Insanely fast. The 8000Hz polling rate feels like liquid in first-person shooters. It is incredibly light too."
      },
      {
        id: "rev-3-2",
        userName: "GamerGirl99",
        rating: 5,
        date: "2026-05-20",
        comment: "No hand fatigue even after 8 hours of tournament play. Worth every single rupee!"
      }
    ]
  },
  {
    id: "prod-4",
    name: "QuantumView 34\" Curved Monitor",
    price: 24999,
    originalPrice: 34999,
    image: "/image-2.png",
    category: "Screen",
    rating: 4.7,
    reviewsCount: 67,
    description: "Unlock ultimate gaming immersion and peak multi-tasking workspace efficiency with a premium 34-inch curved ultra-wide QHD panel. Boasting a blazing 165Hz refresh rate, AMD FreeSync Premium, and 99% sRGB color gamut accuracy.",
    features: [
      "34-inch WQHD (3440 x 1440) 1500R curved display",
      "Blazing 165Hz refresh rate & 1ms response time",
      "AMD FreeSync Premium & HDR10 high contrast",
      "Fully adjustable ergonomic height and tilt stand"
    ],
    specifications: {
      "Resolution": "3440 x 1440 WQHD",
      "Panel Type": "VA Curved (1500R)",
      "Refresh Rate": "165Hz",
      "Inputs": "2x HDMI 2.0, 2x DisplayPort 1.4, Audio Out",
      "Brightness": "350 nits"
    },
    stock: 8,
    inStock: true,
    reviews: [
      {
        id: "rev-4-1",
        userName: "Vikram R.",
        rating: 5,
        date: "2026-05-02",
        comment: "Excellent colors and contrast. Wide format is a game changer for coding and editing multiple files next to each other."
      }
    ]
  },
  {
    id: "prod-5",
    name: "HyperStrike Mechanical Keyboard",
    price: 4999,
    originalPrice: 6999,
    image: "/image-4.png", // Reusing mouse or we can generate a new keyboard image later
    category: "Inputs",
    rating: 4.6,
    reviewsCount: 53,
    description: "A compact 75% hot-swappable mechanical keyboard engineered with pre-lubed linear switches, sound dampening dual-layer silicone foam, and double-shot PBT keycaps. Features full per-key RGB backlighting and wireless triple-mode connectivity.",
    features: [
      "Pre-lubed linear switches for buttery smooth keystrokes",
      "Hot-swappable socket supports 3-pin & 5-pin switches",
      "Triple-mode connectivity (2.4Ghz, Bluetooth 5.1, Wired)",
      "Heavy duty double-shot PBT keycaps with crisp legends"
    ],
    specifications: {
      "Form Factor": "75% Compact (82 Keys)",
      "Switches": "Custom Linear Yellow (Pre-lubed)",
      "Hot-swap Sockets": "Kailh Sockets (3/5-pin compatible)",
      "Battery Capacity": "4000mAh Lithium Polymer",
      "Plate": "Flex-cut PC Plate"
    },
    stock: 15,
    inStock: true,
    reviews: [
      {
        id: "rev-5-1",
        userName: "Rohan D.",
        rating: 5,
        date: "2026-05-10",
        comment: "The typing sound is incredibly satisfying—very deep and solid 'thock'. Triple connectivity is super fast."
      }
    ]
  },
  {
    id: "prod-6",
    name: "OmniHub Pro 8-in-1 USB-C Dock",
    price: 1499,
    originalPrice: 2499,
    image: "/image-3.png", // Reusing watch or generic
    category: "Accessories",
    rating: 4.4,
    reviewsCount: 31,
    description: "Expand your productivity footprint with this premium space-grey aluminum multi-port hub. Featuring robust 100W Power Delivery, crystal-clear 4K HDMI video output, high-speed SD/TF card slots, and dual ultra-fast USB 3.2 data lines.",
    features: [
      "Ultra-crisp HDMI port supporting 4K resolution at 60Hz",
      "Supports rapid USB-C Power Delivery up to 100W",
      "High-speed dual card slots supporting SD and TF cards",
      "Heavy-duty aluminum body with superior thermal heat dissipation"
    ],
    specifications: {
      "Upstream Port": "USB-C Gold-Plated",
      "Output Ports": "1x HDMI (4K@60Hz), 1x USB-C PD 100W, 1x USB-C 3.2, 2x USB-A 3.2, 1x RJ45 Gigabit Ethernet, 1x SD, 1x MicroSD",
      "Housing": "Anodized Space Grey Aluminum",
      "Cable Length": "15cm reinforced nylon braided"
    },
    stock: 50,
    inStock: true,
    reviews: [
      {
        id: "rev-6-1",
        userName: "Elena M.",
        rating: 4,
        date: "2026-05-14",
        comment: "Excellent expansion hub. Gets a tiny bit warm under 100W charging but works perfectly without dropping HDMI connections."
      }
    ]
  }
];
