# BTS Music Showcase (Static Site)

This is a simple static website that lists BTS songs and opens official YouTube/Spotify previews in a modal player.

Important: This project does not host copyrighted audio. It embeds official YouTube videos or links to Spotify. Make sure you use only official videos/streams or links you have permission to include.

## Files
- `index.html` — main page
- `styles.css` — styles
- `script.js` — client-side logic
- `songs.json` — song metadata (YouTube IDs, Spotify IDs, covers)
  
## Run locally
1. Clone or download the folder.
2. From the folder, you can open `index.html` in a browser. For some browsers, fetching `songs.json` via file:// may be blocked — use a simple static server:
   - Python 3: `python -m http.server 8000`
   - Node (http-server): `npx http-server -p 8000`
3. Visit `http://localhost:8000`

## Customize
- Edit `songs.json` to add/remove tracks. Each item supports:
  - `title`, `album`, `year`
  - `youtubeId` (YouTube video id for embed)
  - `spotifyId` (Spotify track id to link)
  - `cover` (image URL)
  - `infoUrl` (link to more info)
- Replace covers with high-quality official artwork (hosted or linked).
- The site embeds YouTube using the `youtubeId`. For Spotify embeds, you can add an iframe if you prefer (update `openPlayer` in `script.js`).

## Deploy
- Push to a GitHub repo and enable GitHub Pages (Pages → Branch: main, folder: / (root)).
- Or deploy to Netlify, Vercel, or any static host.

## Legal / Copyright
- Do NOT upload or host copyrighted audio files without permission.
- Embedding official YouTube videos and Spotify is generally allowed via their embed APIs — ensure compliance with their terms.
- Give credit: This is a fan site and not affiliated with BigHit / HYBE or BTS.

Enjoy! If you want additional features, I can:
- Add playlists, favorites, or local saving (IndexedDB/localStorage).
- Add Spotify Web Playback or Apple Music integration (requires developer keys).
- Convert this to a React or Vue app for more advanced UX.