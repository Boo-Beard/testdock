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
      const eff = String(bg.effect || '').toLowerCase();
      const old = document.querySelector('.video-background');
      if (old && old.remove) old.remove();
      const oldImg = document.querySelector('.image-background');
      if (oldImg && oldImg.remove) oldImg.remove();
      const oldFx = document.querySelector('.effect-canvas');
      if (oldFx && oldFx.remove) oldFx.remove();

      if (bg.type === 'video' && bg.videoUrl) {
        console.info('[bg] using video');
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
        console.info('[bg] using image');
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
        // Insert the image layer directly before the overlay so ordering is solid -> image -> overlay -> content
        if (overlay && overlay.parentNode) {
          overlay.parentNode.insertBefore(d, overlay);
        } else {
          document.body.prepend(d);
        }
        console.info('[bg] image layer inserted');
      } else if (bg.type === 'color' && (eff === 'matrix')) {
        console.info('[bg] using matrix');
        // Force solid transparent so effect is visible, we'll paint base color in canvas
        document.documentElement.style.setProperty('--bg-solid', 'transparent');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          const o = (typeof bg.overlayOpacity === 'number') ? bg.overlayOpacity : 0.4;
          overlay.style.background = `rgba(14,22,33,${Math.max(0, Math.min(1, o))})`;
        }

        const cvs = document.createElement('canvas');
        cvs.className = 'effect-canvas';
        Object.assign(cvs.style, {
          position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '-2', pointerEvents: 'none'
        });
        // Insert below overlay
        if (overlay && overlay.parentNode) {
          overlay.parentNode.insertBefore(cvs, overlay);
        } else {
          document.body.prepend(cvs);
        }
        console.info('[bg] effect canvas inserted (matrix)');

        const ctx = cvs.getContext('2d');
        const baseColor = (bg.color && String(bg.color).trim()) || '#000000';
        const glyphColor = bg.effectColor || '#0f0';
        const alpha = (typeof bg.effectOpacity === 'number') ? Math.max(0, Math.min(1, bg.effectOpacity)) : 0.25;
        const speedMul = (typeof bg.effectSpeed === 'number') ? Math.max(0.1, bg.effectSpeed) : 1.0;
        const density = (typeof bg.effectDensity === 'number') ? Math.max(0.2, Math.min(1, bg.effectDensity)) : 0.9;

        let w = 0, h = 0, cols = 0, drops = [], fontSize = 16;
        const KATA = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴ0123456789ABCDEF';

        function resize() {
          const dpr = window.devicePixelRatio || 1;
          w = cvs.clientWidth * dpr;
          h = cvs.clientHeight * dpr;
          cvs.width = w; cvs.height = h;
          fontSize = Math.max(12, Math.round(16 * dpr));
          cols = Math.floor(w / fontSize);
          drops = new Array(cols).fill(0).map(() => Math.random() * -h);
          ctx.font = `${fontSize}px monospace`;
        }
        resize();
        window.addEventListener('resize', resize);

        let last = performance.now();
        function tick(ts) {
          const dt = Math.min(50, ts - last); last = ts;
          // Base fade to create trails
          ctx.fillStyle = `rgba(0,0,0,${Math.max(0.05, 0.15 * alpha)})`;
          ctx.fillRect(0, 0, w, h);
          // Ensure base color under effect
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = baseColor;
          ctx.fillRect(0, 0, w, h);
          ctx.globalCompositeOperation = 'source-over';

          ctx.fillStyle = glyphColor;
          ctx.globalAlpha = Math.max(0.2, alpha);
          for (let i = 0; i < cols * density; i++) {
            const col = i | 0;
            const x = col * fontSize;
            const y = drops[col] * fontSize;
            const ch = KATA[(Math.random() * KATA.length) | 0];
            ctx.fillText(ch, x, y);
            // Move drop down, reset randomly after it goes off screen
            drops[col] += (dt / 16) * speedMul * (0.9 + Math.random() * 0.2);
            if (y > h && Math.random() > 0.975) drops[col] = -(Math.random() * h / fontSize);
          }
          ctx.globalAlpha = 1;
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      } else if (bg.type === 'color' && (eff === 'flow')) {
        console.info('[bg] using flow');
        // Flow field particles using --primary color
        document.documentElement.style.setProperty('--bg-solid', 'transparent');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          const o = (typeof bg.overlayOpacity === 'number') ? bg.overlayOpacity : 0.25;
          overlay.style.background = `rgba(14,22,33,${Math.max(0, Math.min(1, o))})`;
        }

        const cvs = document.createElement('canvas');
        cvs.className = 'effect-canvas';
        Object.assign(cvs.style, {
          position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '-2', pointerEvents: 'none'
        });
        if (overlay && overlay.parentNode) {
          overlay.parentNode.insertBefore(cvs, overlay);
        } else {
          document.body.prepend(cvs);
        }

        const ctx = cvs.getContext('2d');
        const root = document.documentElement;
        const primaryVar = getComputedStyle(root).getPropertyValue('--primary').trim() || '#00ff88';
        const strokeAlpha = (typeof bg.effectOpacity === 'number') ? Math.max(0.05, Math.min(1, bg.effectOpacity)) : 0.28;
        const speedMul = (typeof bg.effectSpeed === 'number') ? Math.max(0.1, bg.effectSpeed) : 0.6;
        const density = (typeof bg.effectDensity === 'number') ? Math.max(0.2, Math.min(1, bg.effectDensity)) : 0.7;
        const lineWidth = Math.max(0.6, Math.min(2.5, bg.effectLineWidth || 1.0));

        let w = 0, h = 0, dpr = 1, particles = [], count = 0, time = 0;

        function resize() {
          dpr = window.devicePixelRatio || 1;
          cvs.width = Math.floor(cvs.clientWidth * dpr);
          cvs.height = Math.floor(cvs.clientHeight * dpr);
          w = cvs.width; h = cvs.height;
          count = Math.floor((w * h) / (12000 / density));
          particles = new Array(count).fill(0).map(() => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: 0,
            vy: 0,
            life: 100 + Math.random() * 200
          }));
          ctx.setTransform(1,0,0,1,0,0);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
        resize();
        window.addEventListener('resize', resize);

        function fieldAngle(x, y, t) {
          const s = 0.0009 * Math.min(w, h); // scale
          const nx = x * s, ny = y * s;
          // Simple time-varying curl-ish field from trig
          const a = Math.sin(nx + t * 0.0006) + Math.cos(ny - t * 0.0008);
          const b = Math.cos(nx * 0.7 - t * 0.0005) - Math.sin(ny * 0.9 + t * 0.0004);
          return Math.atan2(b, a);
        }

        function tick(ts) {
          time = ts;
          // Fade the canvas slightly for trails
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = `rgba(0,0,0,0.06)`;
          ctx.fillRect(0, 0, w, h);

          ctx.globalCompositeOperation = 'lighter';
          ctx.strokeStyle = primaryVar;
          ctx.globalAlpha = strokeAlpha;
          ctx.lineWidth = lineWidth * (dpr || 1);

          for (let p of particles) {
            const ang = fieldAngle(p.x, p.y, time);
            const spd = 0.6 + Math.random() * 0.4;
            p.vx = Math.cos(ang) * spd * speedMul * dpr;
            p.vy = Math.sin(ang) * spd * speedMul * dpr;

            const nx = p.x + p.vx;
            const ny = p.y + p.vy;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nx, ny);
            ctx.stroke();

            p.x = nx; p.y = ny;
            p.life -= 1;
            if (p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.life <= 0) {
              p.x = Math.random() * w;
              p.y = Math.random() * h;
              p.life = 100 + Math.random() * 200;
            }
          }

          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      } else if (bg.type === 'color' && (eff === 'shaderflow')) {
        console.info('[bg] using shaderFlow');
        // Fullscreen WebGL shader flow using theme --primary
        document.documentElement.style.setProperty('--bg-solid', 'transparent');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
          const o = (typeof bg.overlayOpacity === 'number') ? bg.overlayOpacity : 0.25;
          overlay.style.background = `rgba(14,22,33,${Math.max(0, Math.min(1, o))})`;
        }

        const cvs = document.createElement('canvas');
        cvs.className = 'effect-canvas';
        Object.assign(cvs.style, {
          position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '-2', pointerEvents: 'none'
        });
        if (overlay && overlay.parentNode) {
          overlay.parentNode.insertBefore(cvs, overlay);
        } else {
          document.body.prepend(cvs);
        }

        const gl = cvs.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
        if (!gl) return;

        const vert = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;
        const frag = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uSpeed;
uniform float uDensity;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(in vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5; mat2 m = mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = vUv; uv.x *= uRes.x / uRes.y;
  float t = uTime * uSpeed * 0.0007;
  float dens = mix(0.6, 1.6, clamp(uDensity, 0.0, 1.0));
  vec2 q = uv * dens;
  float f = fbm(q + vec2(0.0, t));
  float g = fbm(q + vec2(4.0, -t));
  float val = smoothstep(0.35, 1.0, mix(f, g, 0.5));
  vec3 col = uColor * (0.35 + 0.65 * val);
  gl_FragColor = vec4(col, uOpacity);
}`;

        function compile(type, src){
          const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
          if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); gl.deleteShader(s); return null; }
          return s;
        }
        function link(vs, fs){
          const p = gl.createProgram(); gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
          if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(p)); gl.deleteProgram(p); return null; }
          return p;
        }

        const vs = compile(gl.VERTEX_SHADER, vert);
        const fs = compile(gl.FRAGMENT_SHADER, frag);
        const prog = vs && fs ? link(vs, fs) : null;
        if (!prog) return;
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          -1,-1,  1,-1,  -1, 1,
          -1, 1,  1,-1,   1, 1
        ]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'aPos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(prog, 'uRes');
        const uTime = gl.getUniformLocation(prog, 'uTime');
        const uColor = gl.getUniformLocation(prog, 'uColor');
        const uOpacity = gl.getUniformLocation(prog, 'uOpacity');
        const uSpeed = gl.getUniformLocation(prog, 'uSpeed');
        const uDensity = gl.getUniformLocation(prog, 'uDensity');

        const primaryCss = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#00ff88';
        function cssToRgb(css){
          const c = document.createElement('canvas');
          c.width = c.height = 1; const ctx = c.getContext('2d');
          ctx.clearRect(0,0,1,1); ctx.fillStyle = css; ctx.fillRect(0,0,1,1);
          const d = ctx.getImageData(0,0,1,1).data; return [d[0]/255, d[1]/255, d[2]/255];
        }
        const col = cssToRgb(primaryCss);

        let dpr = 1, w = 0, h = 0;
        function resize(){
          dpr = window.devicePixelRatio || 1;
          const cw = Math.max(1, Math.floor(cvs.clientWidth * dpr));
          const ch = Math.max(1, Math.floor(cvs.clientHeight * dpr));
          if (cw === w && ch === h) return;
          w = cw; h = ch; cvs.width = w; cvs.height = h;
          gl.viewport(0,0,w,h);
          gl.uniform2f(uRes, w, h);
        }
        resize();
        window.addEventListener('resize', resize);

        const opacity = (typeof bg.effectOpacity === 'number') ? Math.max(0.05, Math.min(1, bg.effectOpacity)) : 0.3;
        const speed   = (typeof bg.effectSpeed === 'number')   ? Math.max(0.1, bg.effectSpeed) : 0.7;
        const density = (typeof bg.effectDensity === 'number') ? Math.max(0.2, Math.min(1, bg.effectDensity)) : 0.9;
        gl.uniform3f(uColor, col[0], col[1], col[2]);
        gl.uniform1f(uOpacity, opacity);
        gl.uniform1f(uSpeed, speed);
        gl.uniform1f(uDensity, density);

        function frame(t){
          gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform1f(uTime, t);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
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
