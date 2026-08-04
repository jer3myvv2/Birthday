const CORRECT_DATE = "17/08/08";

const trackImages = [
  'usage/1000479769.jpg',
  'usage/1000479768.jpg',
  'usage/1000479765.jpg',
  'usage/1000479764.jpg',
  'usage/1000479728.jpg',
];

function renderSlideTracker(){
  const scroller = document.getElementById('slideTrack');
  const images = [...trackImages, ...trackImages];
  scroller.innerHTML = images.map((src, index) =>
    `<img src="${src}" alt="slide ${index % trackImages.length + 1}" loading="lazy">`
  ).join('');
}

function tryUnlock(){
  const input = document.getElementById('lockInput');
  const err = document.getElementById('lockError');
  const val = input.value.trim();
  if (val === CORRECT_DATE || val === "17/08/08" || val === "17/08/2008" || val === "17/08/2008"){
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

document.getElementById('lockInput').addEventListener('input', (e) => {
  let v = e.target.value.replace(/[^\d]/g, '');
  if (v.length > 6) v = v.slice(0,6);
  let out = v;
  if (v.length > 4) out = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
  else if (v.length > 2) out = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = out;
});
document.getElementById('lockInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryUnlock();
});

// ---------- Gifts ----------
const giftContents = [
  { label:'', icon:'gift', title:'Flowers', text:"[i got you flowers.]" },
  { label:'', icon:'heart', title:'Ring', text:"[Youll be wearing it.]" },
  { label:'', icon:'star', title:'Session', text:"[A photobooth session.]" },
  { label:'', icon:'Chain', title:'necklace', text:"[A custom necklace.]" },
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

// ---------- Reasons ----------
const reasons = [
  "[Reason 1 — You just make me smile and alive even in my saddest moments.]",
  "[Reason 2 — You are very caring and understanding.]",
  "[Reason 3 — You are steadfast with your decisions.]",
  "[Reason 4 — Your smile just lightens me up.]",
  "[Reason 5 — You helped me in have a mind of belief and pursistence.]",
  "[Reason 6 — Eres lo mejor que me ha pasado.]",
];
document.getElementById('reasonsList').innerHTML = reasons.map((r,i) => `
  <div class="reason">
    <div class="reason-num">${i+1}</div>
    <div class="reason-text">${r}</div>
  </div>
`).join('');

// ---------- Confetti ----------
const confettiColors = ['#ff93c2','#ffcade','#ffe4f0','#ffffff','#ffc0d8'];
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