<div align="center">

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai" />
<img src="https://img.shields.io/badge/Three.js-3D%20Globe-049EF4?style=for-the-badge&logo=three.js" />
<img src="https://img.shields.io/badge/Google%20Maps-API-4285F4?style=for-the-badge&logo=google-maps" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer" />

<br/>
<br/>

# 🌍 AI Travel Planner

### *Plan your dream trip in seconds with the power of GPT-4o*

**[⭐ Star this repo](https://github.com/your-username/ai-travel-planner)** • **[🚀 Live Demo](#)** • **[📖 Documentation](#)**

<br/>

![AI Travel Planner Demo](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80)

</div>

---

## ✨ What is this?

**AI Travel Planner** is a full-stack web application that generates **complete, personalized travel itineraries** using GPT-4o. Just pick a destination, set your budget, and get a detailed day-by-day plan with:

- 📍 Real attractions & hidden gems
- 🍜 Restaurant recommendations with ratings
- 💰 Detailed budget breakdown
- 🗺️ Interactive Google Maps with all locations pinned
- 💾 Save trips for later

All wrapped in a **stunning 3D UI** with a rotating Earth globe, floating particles, and buttery-smooth animations.

---

## 🎥 Demo

> *Coming soon — add your screenshot/gif here*

| Landing Page | Trip Planner | Generated Itinerary |
|---|---|---|
| 3D Globe + Particles | Step-by-step Wizard | Day-by-day Cards |

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🌐 **3D Earth Globe** | Interactive Three.js globe that rotates and reacts to your destination |
| ✨ **AI Itinerary Generation** | GPT-4o crafts personalized day-by-day plans in ~20 seconds |
| 🗺️ **Live Google Maps** | Every restaurant & attraction pinned on a dark-themed map |
| 💎 **Glassmorphism UI** | Midnight black + gold luxury design system |
| 📱 **Fully Responsive** | Works perfectly on mobile, tablet, and desktop |
| 💾 **Save Trips** | Persist your trips locally, access anytime |
| 🎨 **Framer Motion** | Silky-smooth animations and page transitions |
| 🔍 **Google Places Search** | Real-time destination autocomplete |
| 💰 **Budget Planner** | Detailed cost breakdown per category |
| 🧳 **Travel Info** | Weather, packing tips, transport, and more |

---

## 🛠️ Tech Stack

```
Frontend   →  Next.js 14 (App Router) + TypeScript
Styling    →  Tailwind CSS + Custom CSS Animations
3D         →  Three.js + React Three Fiber + Drei
Animation  →  Framer Motion
AI         →  OpenAI GPT-4o API
Maps       →  Google Maps JavaScript API + Places API
State      →  Zustand (with localStorage persistence)
Icons      →  Lucide React
Fonts      →  Space Grotesk + Inter (Google Fonts)
```

---

## ⚡ Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/your-username/ai-travel-planner.git
cd ai-travel-planner
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your API keys:
```env
OPENAI_API_KEY=sk-your-openai-key-here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza-your-google-maps-key-here
```

> **No API keys?** The app works with smart mock data — you can demo it without any keys!

### 4. Run the development server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** 🚀

---

## 🔑 API Keys Setup

### OpenAI API Key
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new secret key
3. Add to `.env.local` as `OPENAI_API_KEY`

### Google Maps API Key
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
3. Create credentials → API Key
4. Add to `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # 🏠 Landing page with 3D globe
│   ├── plan/page.tsx         # ✈️ Trip planner wizard
│   ├── trips/page.tsx        # 💾 Saved trips grid
│   ├── trips/[id]/page.tsx   # 📋 Trip detail view
│   └── api/
│       ├── generate-trip/    # 🤖 OpenAI endpoint
│       └── places/           # 🔍 Google Places proxy
├── components/
│   ├── 3d/
│   │   ├── Globe.tsx         # 🌍 Three.js Earth globe
│   │   └── ParticleField.tsx # ✨ Background particles
│   ├── planner/
│   │   ├── TripWizard.tsx    # 📝 3-step form wizard
│   │   ├── DestinationSearch.tsx
│   │   └── ItineraryDisplay.tsx
│   ├── map/TripMap.tsx       # 🗺️ Google Maps component
│   └── layout/Navbar.tsx
├── store/tripStore.ts        # 🗃️ Zustand state management
└── types/trip.ts             # 📦 TypeScript types
```

---

## 🎨 Design System

This project uses a custom **Midnight Black × Gold** luxury design language:

- **Background:** `#080808` deep obsidian
- **Primary:** `#f59e0b` gold gradient
- **Glass:** `rgba(255,255,255,0.04)` with `backdrop-filter: blur(20px)`
- **Font:** Space Grotesk (headings) + Inter (body)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs via Issues
- 💡 Request features
- 🔀 Submit pull requests

```bash
# Fork → Clone → Create branch → Make changes → PR
git checkout -b feature/my-awesome-feature
git commit -m "feat: add my awesome feature"
git push origin feature/my-awesome-feature
```

---

## 📄 License

MIT License — feel free to use this project for personal or commercial projects.

---

<div align="center">

**If this project helped you, please give it a ⭐ — it means the world!**

Built with ❤️ using Next.js, OpenAI & Three.js

[⭐ Star on GitHub](https://github.com/your-username/ai-travel-planner) • [🐦 Share on Twitter](https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20AI%20Travel%20Planner%20built%20with%20Next.js%20%26%20GPT-4o!%20%F0%9F%8C%8D&url=https://github.com/your-username/ai-travel-planner)

</div>
