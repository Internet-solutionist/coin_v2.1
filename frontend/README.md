## CoIn v2.1 Frontend — Stunning React Dashboard

This is the production-ready, visually stunning frontend for the **CoIn Sovereign 6-Agent AI Trading Firm**.

### Features
- Bleeding-edge glassmorphism + plasma neon gradients
- Real-time animated charts & live decision stream
- 6 interactive agent cards with confidence & status
- Tamper-proof audit integration
- One-click cycle trigger with confetti celebration
- Customizable themes (Neon / Dark / Light)
- Fully responsive (desktop + mobile)
- Micro-animations on every interaction (framer-motion)
- Ready for direct integration with the FastAPI backend

### Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

### Integration with Backend

The dashboard already calls the `/cycle` endpoint on the running FastAPI server (port 8000).

Make sure your backend is running:
```bash
uvicorn main:app --reload
```

### Tech Stack
- React 18 + TypeScript
- Material-UI v6 + Tailwind
- framer-motion + recharts
- lucide-react icons

### Production Notes
- Replace mock data with real WebSocket or polling from `/portfolio` and `/metrics` endpoints
- Add authentication layer when going live
- The component is fully self-contained and can be dropped into any React/Vite/Next.js project

Built with love for the sovereign AI Trading Firm.