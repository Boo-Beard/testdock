import config from '../config/config.js';

(function applyTheme(cfg){
  try {
    const vars = cfg?.theme || {};
    const root = document.documentElement;
    Object.keys(vars).forEach(k => {
      const val = String(vars[k] ?? '').replace(/;+\s*$/,'');
      root.style.setProperty(k, val);
    });

    // Apply font variables if provided
    const fonts = cfg?.fonts || {};
    if (fonts.body) root.style.setProperty('--font-body', fonts.body);
    if (fonts.projectName) root.style.setProperty('--font-project-name', fonts.projectName);
    if (fonts.stats) root.style.setProperty('--font-stats', fonts.stats);

    // Apply background derived from config only
    const bg = cfg?.background || {};
    // Decide the solid layer color from config.background if provided, otherwise theme --bg-dark
    const fallbackDark = vars['--bg-dark'] || getComputedStyle(root).getPropertyValue('--bg-dark') || '#0E1621';
    const solid = (bg.type === 'video' || bg.type === 'image')
      ? 'transparent'
      : (bg.solid && String(bg.solid).trim().length ? bg.solid
         : (bg.type === 'color' && bg.color ? bg.color : String(fallbackDark).trim()));
    root.style.setProperty('--bg-solid', solid);
    // Respect overlayOpacity if provided (for both color and video modes)
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      const o = (typeof bg.overlayOpacity === 'number') ? bg.overlayOpacity : 0.4;
      overlay.style.background = `rgba(14,22,33,${Math.max(0, Math.min(1, o))})`;
    }
  } catch {}
})(config);

// Expose config globally for legacy code to read
window.TOKEN_DOCK_CONFIG = config;

// Attempt to bust stale module cache and refresh config once per load
try {
  const stamp = Date.now();
  import(`../config/config.js?ts=${stamp}`).then(mod => {
    if (mod && mod.default) {
      const fresh = mod.default;
      const prev = window.TOKEN_DOCK_CONFIG || {};
      // Shallow compare a couple of keys that matter for badges/features
      const changed = (
        JSON.stringify(prev.token || {}) !== JSON.stringify(fresh.token || {}) ||
        JSON.stringify(prev.features || {}) !== JSON.stringify(fresh.features || {})
      );
      if (changed) {
        window.TOKEN_DOCK_CONFIG = fresh;
        document.dispatchEvent(new CustomEvent('config-updated', { detail: { fresh } }));
      }
    }
  }).catch(()=>{});
} catch {}

(function hydrateHeader(cfg){
  try {
    const logoEl = document.getElementById('projectLogo');
    if (logoEl && cfg?.branding?.logoUrl) {
      logoEl.src = cfg.branding.logoUrl;
    }
    const nameEl = document.getElementById('projectName');
    if (nameEl && cfg?.projectName) {
      nameEl.textContent = cfg.projectName;
    }
    const taglineEl = document.getElementById('projectTagline');
    if (taglineEl && typeof cfg?.tagline === 'string') {
      taglineEl.textContent = cfg.tagline;
    }
    const missionEl = document.getElementById('projectMission');
    if (missionEl && typeof cfg?.mission === 'string' && cfg.mission.trim().length) {
      missionEl.textContent = cfg.mission;
      missionEl.style.display = 'block';
    }
  } catch {}
})(config);

(function hydrateSocials(cfg){
  try {
    const socialsEl = document.getElementById('socialLinks');
    if (!socialsEl) return;
    const links = [];
    const s = cfg?.socials || {};
    if (s.twitter) links.push(`<a href="${s.twitter}" target="_blank" class="social-link"><i class="fa-brands fa-x-twitter"></i></a>`);
    if (s.telegram) links.push(`<a href="${s.telegram}" target="_blank" class="social-link"><i class="fab fa-telegram"></i></a>`);
    if (s.website) links.push(`<a href="${s.website}" target="_blank" class="social-link"><i class="fa-solid fa-desktop"></i></a>`);
    if (s.medium) links.push(`<a href="${s.medium}" target="_blank" class="social-link"><i class="fab fa-medium"></i></a>`);
    if (s.github) links.push(`<a href="${s.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>`);
    if (s.instagram) links.push(`<a href="${s.instagram}" target="_blank" class="social-link"><i class="fab fa-instagram"></i></a>`);
    if (s.linkedin) links.push(`<a href="${s.linkedin}" target="_blank" class="social-link"><i class="fa-brands fa-linkedin"></i></a>`);
    if (s.discord) links.push(`<a href="${s.discord}" target="_blank" class="social-link"><i class="fa-brands fa-discord"></i></a>`);
    if (links.length) {
      socialsEl.innerHTML = links.join('');
      socialsEl.style.display = 'flex';
    }
  } catch {}
})(config);

// Nothing else here. The legacy page script (dock-address.js) will read the global config
// to resolve address/chain and render the rest. This keeps the change minimal for now.

// Optional background video injection
(function applyBackgroundMedia(cfg){
  const run = () => {
    try {
      const bg = cfg?.background || {};
      const old = document.querySelector('.video-background');
      if (old && old.remove) old.remove();
      const oldImg = document.querySelector('.image-background');
      if (oldImg && oldImg.remove) oldImg.remove();
      const oldFx = document.querySelector('.effect-canvas');
      if (oldFx && oldFx.remove) oldFx.remove();

      if (bg.type === 'video' && bg.videoUrl) {
        document.documentElement.style.setProperty('--bg-solid', 'transparent');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          const o = (typeof bg.overlayOpacity === 'number') ? bg.overlayOpacity : 0.4;
          overlay.style.background = `rgba(14,22,33,${Math.max(0, Math.min(1, o))})`;
        }

        const v = document.createElement('video');
        v.className = 'video-background';
        v.autoplay = true;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        if (bg.opacity != null) v.style.opacity = String(bg.opacity);
        if (bg.filter) v.style.filter = bg.filter;

        const src = document.createElement('source');
        src.src = bg.videoUrl;
        src.type = 'video/mp4';
        v.appendChild(src);

        document.body.prepend(v);
      } else if (bg.type === 'image' && bg.imageUrl) {
        document.documentElement.style.setProperty('--bg-solid', 'transparent');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          const o = (typeof bg.overlayOpacity === 'number') ? bg.overlayOpacity : 0.4;
          overlay.style.background = `rgba(14,22,33,${Math.max(0, Math.min(1, o))})`;
        }

        const d = document.createElement('div');
        d.className = 'image-background';
        Object.assign(d.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          // Place between .solid-background (typically -2/-3) and .overlay (-1)
          zIndex: '-2',
          pointerEvents: 'none',
          backgroundImage: `url(${bg.imageUrl})`,
          backgroundSize: (bg.imageFit === 'contain' ? 'contain' : (bg.imageFit === 'fill' ? '100% 100%' : 'cover')),
          backgroundPosition: bg.imagePosition || 'center center',
          backgroundRepeat: bg.imageRepeat || 'no-repeat',
          opacity: (bg.opacity != null ? String(bg.opacity) : ''),
          filter: (bg.filter || '')
        });
        if (overlay && overlay.parentNode) {
          overlay.parentNode.insertBefore(d, overlay);
        } else {
          document.body.prepend(d);
        }

        // Optional lightweight numeric ASCII overlay
        if (String(bg.effect || '').toLowerCase() === 'numbers') {
          try {
            const old = document.querySelector('.numbers-overlay');
            if (old && old.remove) old.remove();

            const c = document.createElement('canvas');
            c.className = 'numbers-overlay';
            Object.assign(c.style, {
              position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
              zIndex: '0', pointerEvents: 'none', opacity: '0.9'
            });
            document.body.appendChild(c);

            // Track background image natural size to compute visible rect (for contain/cover)
            let imgW = 0, imgH = 0;
            const metaImg = new Image();
            metaImg.onload = () => { imgW = metaImg.naturalWidth; imgH = metaImg.naturalHeight; };
            metaImg.src = bg.imageUrl || '';

            const ctx = c.getContext('2d');
            const glyphs = "0123456789 qwertyuiop[]\\asdfghjkl;'zxcvbnm,./*}P|+_)(*&^%$#@!";
            let raf = 0;
            const state = { cell: 28, alpha: 0.10, intervalMs: 600, fadeFrac: 0.40 };

            function resize() {
              const dpr = Math.min(window.devicePixelRatio || 1, 2);
              const vw = document.documentElement.clientWidth;
              const vh = document.documentElement.clientHeight;
              c.width = Math.floor(vw * dpr);
              c.height = Math.floor(vh * dpr);
              c.style.width = vw + 'px';
              c.style.height = vh + 'px';
              ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }

            function smoothstep(e0, e1, x) {
              const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
              return t * t * (3 - 2 * t);
            }

            function parsePosition(pos, vw, vh, rectW, rectH) {
              // pos like 'center center', 'left top', '50% 30%'
              const parts = String(pos || 'center center').trim().split(/\s+/);
              let hx = parts[0] || 'center';
              let hy = parts[1] || 'center';
              const toOffset = (token, v, span) => {
                if (token.endsWith('%')) return (parseFloat(token) / 100) * (v - span);
                if (token === 'left' || token === 'top') return 0;
                if (token === 'center') return (v - span) / 2;
                if (token === 'right' || token === 'bottom') return v - span;
                // px number
                const n = parseFloat(token);
                return isNaN(n) ? (v - span) / 2 : n;
              };
              const x = toOffset(hx, vw, rectW);
              const y = toOffset(hy, vh, rectH);
              return { x, y };
            }

            function tick(ts) {
              const interval = state.intervalMs;
              const bucket = Math.floor(ts / interval);
              const tRel = (ts % interval) / interval; // 0..1 within interval
              const fStart = Math.max(0, 1 - state.fadeFrac);
              const fade = smoothstep(fStart, 1, tRel);

              ctx.clearRect(0, 0, c.width, c.height);
              const w = c.clientWidth, h = c.clientHeight;
              const size = state.cell;
              const cols = Math.ceil(w / size) + 1;
              const rows = Math.ceil(h / size) + 1;

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = `bold ${Math.floor(size*0.65)}px monospace`;

              // Compute the drawn image rectangle and clip so we only draw over the wallpaper
              const fit = (bg.imageFit === 'contain' || bg.imageFit === 'fill' || bg.imageFit === 'cover') ? bg.imageFit : 'cover';
              let rectX = 0, rectY = 0, rectW = w, rectH = h;
              if (imgW > 0 && imgH > 0) {
                const vw = w, vh = h;
                const arImg = imgW / imgH;
                const arView = vw / vh;
                if (fit === 'contain') {
                  if (arImg > arView) { rectW = vw; rectH = vw / arImg; rectX = 0; rectY = (vh - rectH) / 2; }
                  else { rectH = vh; rectW = vh * arImg; rectY = 0; rectX = (vw - rectW) / 2; }
                } else if (fit === 'cover') {
                  if (arImg > arView) { rectH = vh; rectW = vh * arImg; rectY = 0; rectX = (vw - rectW) / 2; }
                  else { rectW = vw; rectH = vw / arImg; rectX = 0; rectY = (vh - rectH) / 2; }
                } else { // fill
                  rectX = 0; rectY = 0; rectW = vw; rectH = vh;
                }
                // Apply background-position offsets
                const pos = parsePosition(bg.imagePosition || 'center center', vw, vh, rectW, rectH);
                rectX = pos.x; rectY = pos.y;
              }

              ctx.save();
              ctx.beginPath();
              ctx.rect(rectX, rectY, rectW, rectH);
              ctx.clip();

              // Tighten iteration to only cover the image rect
              const startCol = Math.max(-1, Math.floor((rectX - size) / size));
              const endCol = Math.min(cols, Math.ceil((rectX + rectW + size) / size));
              const startRow = Math.max(-1, Math.floor((rectY - size) / size));
              const endRow = Math.min(rows, Math.ceil((rectY + rectH + size) / size));

              for (let r = startRow; r < endRow; r++) {
                for (let col = startCol; col < endCol; col++) {
                  // Dense: draw every cell
                  const x = col * size + size/2;
                  const y = r * size + size/2;
                  const baseSeed = (r*131 + col*137) & 0xffff;
                  const cadence = 1 + (baseSeed % 4);
                  const phasePrev = Math.floor(bucket / cadence);
                  const phaseNext = Math.floor((bucket + 1) / cadence);

                  const seedPrev = (baseSeed + phasePrev*73) & 0xffff;
                  const chPrev = glyphs.charAt(seedPrev % glyphs.length);
                  const randPrev = seedPrev % 100;
                  const isGreenPrev = randPrev < 12; // ~12%
                  const isBlackPrev = !isGreenPrev && randPrev < 24; // next ~12%
                  const isWhitePrev = !isGreenPrev && !isBlackPrev && randPrev < 26; // ~2%

                  const seedNext = (baseSeed + phaseNext*73) & 0xffff;
                  const chNext = glyphs.charAt(seedNext % glyphs.length);
                  const randNext = seedNext % 100;
                  const isGreenNext = randNext < 12; // ~12%
                  const isBlackNext = !isGreenNext && randNext < 24; // next ~12%
                  const isWhiteNext = !isGreenNext && !isBlackNext && randNext < 26; // ~2%

                  if (phasePrev === phaseNext) {
                    const g = 170 + (seedPrev % 40);
                    ctx.save();
                    if (isGreenPrev) {
                      ctx.fillStyle = 'rgb(175,255,0)';
                      ctx.globalAlpha = 0.16;
                    } else if (isBlackPrev) {
                      ctx.fillStyle = 'rgb(0,0,0)';
                      ctx.globalAlpha = 0.14;
                    } else if (isWhitePrev) {
                      ctx.fillStyle = 'rgb(255,255,255)';
                      ctx.globalAlpha = 0.14;
                    } else {
                      ctx.fillStyle = `rgb(${g},${g},${g})`;
                      ctx.globalAlpha = state.alpha;
                    }
                    ctx.fillText(chPrev, x, y);
                    ctx.restore();
                    continue;
                  }

                  // Cross-fade prev -> next
                  {
                    const g = 170 + (seedPrev % 40);
                    ctx.save();
                    if (isGreenPrev) {
                      ctx.fillStyle = 'rgb(175,255,0)';
                      ctx.globalAlpha = 0.16 * (1 - fade);
                    } else if (isBlackPrev) {
                      ctx.fillStyle = 'rgb(0,0,0)';
                      ctx.globalAlpha = 0.14 * (1 - fade);
                    } else if (isWhitePrev) {
                      ctx.fillStyle = 'rgb(255,255,255)';
                      ctx.globalAlpha = 0.14 * (1 - fade);
                    } else {
                      ctx.fillStyle = `rgb(${g},${g},${g})`;
                      ctx.globalAlpha = state.alpha * (1 - fade);
                    }
                    ctx.fillText(chPrev, x, y);
                    ctx.restore();
                  }
                  {
                    const g = 170 + (seedNext % 40);
                    ctx.save();
                    if (isGreenNext) {
                      ctx.fillStyle = 'rgb(175,255,0)';
                      ctx.globalAlpha = 0.16 * fade;
                    } else if (isBlackNext) {
                      ctx.fillStyle = 'rgb(0,0,0)';
                      ctx.globalAlpha = 0.14 * fade;
                    } else if (isWhiteNext) {
                      ctx.fillStyle = 'rgb(255,255,255)';
                      ctx.globalAlpha = 0.14 * fade;
                    } else {
                      ctx.fillStyle = `rgb(${g},${g},${g})`;
                      ctx.globalAlpha = state.alpha * fade;
                    }
                    ctx.fillText(chNext, x, y);
                    ctx.restore();
                  }
                }
              }

              ctx.restore();
              raf = requestAnimationFrame(tick);
            }

            const onResize = () => { resize(); };
            window.addEventListener('resize', onResize);
            if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
            resize();
            raf = requestAnimationFrame(tick);

            document.addEventListener('visibilitychange', () => {
              if (document.hidden && raf) cancelAnimationFrame(raf);
              else if (!document.hidden) raf = requestAnimationFrame(tick);
            });
          } catch {}
        }
      }
    } catch {}
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})(config);

// Modular chart lazy loader
(function setupModularChart() {
  const cfg = window.TOKEN_DOCK_CONFIG || {};
  const features = cfg.features || {};
  if (features.modularChart !== true) return;

  let mounted = false;
  async function ensureMount() {
    if (mounted) return;
    try {
      const mod = await import('../modules/chart/chart.js');
      await mod.mount();
      mounted = true;
    } catch {}
  }

  // Try after DOMContentLoaded (after legacy render builds the DOM)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(ensureMount, 0));
  } else {
    setTimeout(ensureMount, 0);
  }

  // Also lazy-load on first interaction with chart toggle
  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('#toggleChart');
    if (btn) ensureMount();
  }, { once: false, passive: true });
})();
