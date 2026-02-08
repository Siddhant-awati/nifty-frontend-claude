TRADING DASHBOARD - REACT FRONTEND
===================================

QUICK START
-----------
1. npm install
2. npm run dev
3. Open http://localhost:5173

FEATURES
--------
✓ Real-time WebSocket connection to backend
✓ Live index cards (NIFTY, BANKNIFTY, SENSEX)
✓ Option chain tables with ATM highlighting
✓ Color-coded signals (Green=BULL, Red=BEAR, Amber=PAUSED)
✓ Auto-reconnect on disconnect
✓ Responsive design
✓ Dark theme UI

STRUCTURE
---------
main.jsx - Entry point
App.jsx - Main component
Header.jsx - Top bar with stats
IndexCard.jsx - Index display cards
OptionChainTable.jsx - Option chain tables
useWebSocket.js - WebSocket hook
index.css - Global styles
vite.config.js - Vite configuration

REQUIREMENTS
------------
- Backend running on http://localhost:3000
- WebSocket server on ws://localhost:8080
- Node.js 14+

BUILD FOR PRODUCTION
--------------------
npm run build
npm run preview
