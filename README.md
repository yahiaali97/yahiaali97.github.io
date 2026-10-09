# Yahia Ali – Portfolio

Static site (HTML + CSS + JS). Three.js (from CDN) powers the 3D bugs and the station-by-station journey.

## Run locally

```bash
cd yahia-portfolio
npm start              # needs Node.js  -> http://localhost:5173
# or
python -m http.server 5173              # -> http://localhost:5173
```

Needs an internet connection for Three.js and Google Fonts.

## Edit

| What | Where |
|---|---|
| Photo | `assets/profile.jpg` |
| CV file | `cv.pdf` |
| Journey stations and tasks | `js/main.js` → `var ST=[...]` |
| Projects and tags | `js/main.js` → `var P=[...]` |
| Skills | `js/main.js` → `var SKILLS=[...]` and the chips in `index.html` |
| Colors (dark + light) | top of `css/style.css` |

## Real pictures on the 3D station cards (optional)

Put images in `assets/stations/` named `helwan.jpg`, `bconnect.jpg`, `bit68.jpg`, `siegwerk.jpg` (landscape, about 16:9).
They replace the drawn illustrations automatically. Don't use screenshots of confidential company systems.
# yahiaali97.github.io
