const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const albumFilter = document.getElementById('albumFilter');

const modal = document.getElementById('playerModal');
const embedContainer = document.getElementById('embedContainer');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const openOnYoutube = document.getElementById('openOnYoutube');
const openOnSpotify = document.getElementById('openOnSpotify');

let songs = [];

async function loadSongs(){
  try{
    const res = await fetch('songs.json');
    songs = await res.json();
    renderFilterOptions();
    renderGrid(songs);
  }catch(e){
    grid.innerHTML = '<p style="color:var(--muted)">Failed to load songs.json</p>';
    console.error(e);
  }
}

function renderFilterOptions(){
  const albums = [...new Set(songs.map(s=>s.album).filter(Boolean))];
  albums.sort();
  for(const a of albums){
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    albumFilter.appendChild(opt);
  }
}

function renderGrid(list){
  grid.innerHTML = '';
  if(list.length===0){
    grid.innerHTML = '<p style="color:var(--muted);text-align:center">No songs found</p>';
    return;
  }
  for(const s of list){
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;

    const img = document.createElement('img');
    img.className = 'cover';
    img.alt = `${s.title} cover`;
    img.src = s.cover || `https://via.placeholder.com/640x640?text=${encodeURIComponent(s.title)}`;

    const m = document.createElement('div');
    m.className = 'meta';
    m.innerHTML = `<div class="title">${s.title}</div><div class="album">${s.album} • ${s.year || ''}</div>`;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const playBtn = document.createElement('button');
    playBtn.className = 'btn play';
    playBtn.textContent = 'Play preview';
    playBtn.addEventListener('click', ()=>openPlayer(s));
    playBtn.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openPlayer(s) });

    const moreBtn = document.createElement('a');
    moreBtn.className = 'btn';
    moreBtn.textContent = 'More';
    moreBtn.href = s.infoUrl || '#';
    moreBtn.target = '_blank';
    moreBtn.rel = 'noopener';

    actions.appendChild(playBtn);
    actions.appendChild(moreBtn);

    card.appendChild(img);
    card.appendChild(m);
    card.appendChild(actions);
    grid.appendChild(card);
  }
}

function openPlayer(song){
  // Build YouTube embed if available, otherwise fall back to Spotify embed
  embedContainer.innerHTML = '';
  modalTitle.textContent = `${song.title} — ${song.album || ''}`;
  if(song.youtubeId){
    const yt = document.createElement('iframe');
    yt.src = `https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&rel=0`;
    yt.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    yt.allowFullscreen = true;
    embedContainer.appendChild(yt);
    openOnYoutube.href = `https://www.youtube.com/watch?v=${song.youtubeId}`;
    openOnYoutube.style.display = 'inline-block';
  }else{
    openOnYoutube.style.display = 'none';
  }

  if(song.spotifyId){
    openOnSpotify.href = `https://open.spotify.com/track/${song.spotifyId}`;
    openOnSpotify.style.display = 'inline-block';
  }else{
    openOnSpotify.style.display = 'none';
  }

  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closePlayer(){
  modal.setAttribute('aria-hidden','true');
  embedContainer.innerHTML = ''; // remove iframe to stop playback
  document.body.style.overflow = '';
}

closeModal.addEventListener('click', closePlayer);
modal.addEventListener('click', (e)=>{
  if(e.target.classList.contains('modal-backdrop')) closePlayer();
});
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closePlayer(); });

searchInput.addEventListener('input', applyFilters);
albumFilter.addEventListener('change', applyFilters);

function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const album = albumFilter.value;
  let out = songs.filter(s=>{
    const matchQ = !q || (s.title && s.title.toLowerCase().includes(q)) || (s.album && s.album.toLowerCase().includes(q));
    const matchAlbum = !album || s.album === album;
    return matchQ && matchAlbum;
  });
  renderGrid(out);
}

// Init
loadSongs();