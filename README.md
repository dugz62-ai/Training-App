# Douglas Training – v1
Static PWA (no build step). Serve the folder over HTTPS (GitHub Pages / Netlify) and open index.html in Safari, then Share → Add to Home Screen.
- data.js: exercise content generated from the "Exercise Guide" Page (links unchanged).
- app.js: schedule, logging, history, share text, backup. Data is in localStorage (key dt.sessions.v1).
- sw.js: offline cache. Bump the CACHE name when you change files.
Local test: python3 -m http.server 8765 → http://localhost:8765/
