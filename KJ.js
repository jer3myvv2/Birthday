const CORRECT_DATE = "12/10/08";

const trackImages = [
  'usage/1000648485.jpg',
  'usage/1000648481.jpg',
  'usage/1000646832.jpg',
  'usage/1000642651.jpg',
  'usage/1000642437.jpg',
];

const galleryItems = [
  { type:'image', src:'usage/1000632092.jpg', alt:'Memory photo 1' },
  { type:'image', src:'usage/1000632133.jpg', alt:'Memory photo 2' },
  { type:'image', src:'usage/1000637053.jpg', alt:'Memory photo 3' },
  { type:'image', src:'usage/1000637057.jpg', alt:'Memory photo 4' },
  { type:'image', src:'usage/1000637058.jpg', alt:'Memory photo 5' },
  { type:'image', src:'usage/1000642281.jpg', alt:'Memory photo 6' },
  { type:'image', src:'usage/1000642297.jpg', alt:'Memory photo 7' },
  { type:'image', src:'usage/1000642423.jpg', alt:'Memory photo 8' },
  { type:'image', src:'usage/1000642437.jpg', alt:'Memory photo 9' },
  { type:'image', src:'usage/1000642451.jpg', alt:'Memory photo 10' },
  { type:'image', src:'usage/1000642651.jpg', alt:'Memory photo 11' },
  { type:'image', src:'usage/1000646832.jpg', alt:'Memory photo 12' },
  { type:'image', src:'usage/1000648481.jpg', alt:'Memory photo 13' },
  { type:'image', src:'usage/1000648485.jpg', alt:'Memory photo 14' },
  { type:'image', src:'usage/1000635045.gif', alt:'Memory video 1' },
  { type:'image', src:'usage/1000642856.gif', alt:'Memory video 2' },
];

function renderSlideTracker(){
  const scroller = document.getElementById('slideTrack');
  const images = [...trackImages, ...trackImages];
  scroller.innerHTML = images.map((src, index) =>
    `<img src="${src}" alt="slide ${index % trackImages.length + 1}" loading="lazy">`
  ).join('');
}

function renderGallery(){
  const grid = document.getElementById('galleryGrid');
  const sortedItems = [...galleryItems].sort((a, b) => {
    if (a.type === b.type) return 0;
    return a.type === 'image' ? -1 : 1;
  });
  grid.innerHTML = sortedItems.map((item) => {
    if (item.type === 'image'){
      return `
        <button class="gallery-card" type="button" onclick="openGallery('${item.src}', 'image')">
          <img src="${item.src}" alt="${item.alt}">
        </button>
      `;
    }
    return `
      <button class="gallery-card" type="button" onclick="openGallery('${item.src}', 'video')">
        <video muted autoplay loop playsinline webkit-playsinline preload="metadata" src="${item.src}"></video>
        <div class="video-preview-overlay"><span>▶</span></div>
      </button>
    `;
  }).join('');
}

function viewFullGallery(){
  document.getElementById('gallery').scrollIntoView({ behavior:'smooth' });
}

function tryUnlock(){
  const input = document.getElementById('lockInput');
  const err = document.getElementById('lockError');
  const val = input.value.trim();
  if (val === CORRECT_DATE || val === "12/10/08" || val === "12/10/2008" || val === "12/10/2008"){
    document.getElementById('lock').style.display = 'none';
    const gifts = document.getElementById('gifts');
    gifts.classList.add('reveal');
    gifts.scrollIntoView({ behavior:'smooth' });
    err.textContent = '';
  } else {
    err.textContent = "That's not quite it — try again 💚";
  }
}

renderSlideTracker();
renderGallery();

document.getElementById('lockInput').addEventListener('input', (e) => {
  let v = e.target.value.replace(/[^\d]/g, '');
  if (v.length > 6) v = v.slice(0,6);
  let out = v;
  if (v.length > 4) out = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
  else if (v.length > 2) out = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = out;
});
document.getElementById('lockInput').addEventListener('focus', (e) => {
  e.target.type = 'tel';
});
document.getElementById('lockInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryUnlock();
});

// ---------- Gifts ----------
const giftContents = [
  { label:'', icon:'gift', title:'Flowers', text:"[i got you flowers.]" },
  { label:'', icon:'sun', title:'Sunset Walk', text:"[A slow sunset walk with you.]" },
  { label:'', icon:'moon', title:'Card', text:"[Custome made card]" },
];

const iconPaths = {
  gift: '<path d="M20 12v10H4V12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/>',
  star: '<path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>'
};

function renderGifts(){
  const grid = document.getElementById('giftGrid');
  grid.innerHTML = giftContents.map((g,i) => `
    <button class="gift" id="gift-${i}" onclick="openGift(${i})">
      <div class="gift-box">
        <div class="gift-bow"></div>
        <div class="gift-lid"></div>
        <div class="gift-body"></div>
        <div class="gift-ribbon-v"></div>
      </div>
      <div class="gift-label">${g.label}</div>
    </button>
  `).join('');
}
renderGifts();

function openGift(i){
  const g = giftContents[i];
  document.getElementById('gift-'+i).classList.add('opened');
  document.getElementById('modalIcon').innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconPaths[g.icon]}</svg>`;
  document.getElementById('modalTitle').textContent = g.title;
  document.getElementById('modalText').textContent = g.text;
  document.getElementById('giftModal').classList.add('open');
}
function closeGiftModal(){
  document.getElementById('giftModal').classList.remove('open');
}

function openGallery(src, type){
  const modal = document.getElementById('galleryModal');
  const content = document.getElementById('galleryModalContent');
  if (type === 'image'){
    content.innerHTML = `<img src="${src}" alt="Gallery image">`;
  } else {
    content.innerHTML = `<video controls autoplay muted loop playsinline webkit-playsinline>
      <source src="${src}" type="video/mp4">
      Your browser does not support the video tag.
    </video>`;
  }
  modal.classList.add('open');
}
function closeGalleryModal(){
  document.getElementById('galleryModal').classList.remove('open');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    closeGiftModal();
    closeGalleryModal();
  }
});

// ---------- Reasons ----------
const reasons = [
  "You can make me smile, even on my hardest days.",
  "You care deeply and always try to understand the people around you.",
  "I admire how sure of yourself you are and how you stand by your decisions.",
  "Your smile has a way of brightening my whole day.",
  "You inspire me to believe in myself and keep going.",
  "Sie sind einer der besten Menschen, die ich dieses Jahr kennengelernt habe",
];
document.getElementById('reasonsList').innerHTML = reasons.map((r,i) => `
  <div class="reason">
    <div class="reason-num">${i+1}</div>
    <div class="reason-text">${r}</div>
  </div>
`).join('');

// ---------- Confetti ----------
const confettiColors = ['#b99cff','#d9ccff','#eee6ff','#ffffff','#a889ef'];
function celebrate(){
  const wrap = document.getElementById('confettiWrap');
  for (let i = 0; i < 60; i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + '%';
    c.style.background = confettiColors[Math.floor(Math.random()*confettiColors.length)];
    c.style.animationDuration = (2.5 + Math.random()*2) + 's';
    c.style.animationDelay = (Math.random()*0.4) + 's';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    wrap.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}