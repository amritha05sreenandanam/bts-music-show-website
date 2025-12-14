# BTS Music Showcase

A simple static site that lists BTS songs and opens official YouTube/Spotify previews in a modal player.

Important: This project embeds official videos or links to streaming services. Do not upload copyrighted audio files.

## Files
- `index.html` — main page
- `styles.css` — styles
- `script.js` — client-side logic
- `songs.json` — song metadata (YouTube IDs, Spotify IDs, covers)

## Run locally
1. Save the files in a folder.
2. Start a simple static server (recommended):
   - Python 3: `python -m http.server 8000`
   - Node (http-server): `npx http-server -p 8000`
3. Visit `http://localhost:8000`

## Deploy to GitHub Pages
Option A — create a repo and push the files (commands below).
Option B — use GitHub web UI to create a repo and upload files.

If you want automatic Pages deployment, this repository includes a simple GitHub Actions workflow that will deploy the site.

## Customize
- Edit `songs.json` to add/remove tracks (use official YouTube video IDs and Spotify track IDs).
- Replace `cover` image URLs with official artwork.
- Add favorites, playlists, or convert to React if you'd like.

## License
MIT