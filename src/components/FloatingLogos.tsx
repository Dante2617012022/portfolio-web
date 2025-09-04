import React, { useEffect, useRef } from "react";

type Logo = {
  src: string;
  radius?: number;       // px (opcional, default 28)
  mass?: number;         // opcional, default proporcional al área
};

type Props = {
  logos: Logo[];
  restitution?: number;  // 0–1 (rebote)  default 0.9
  maxSpeed?: number;     // px/ms         default 0.9
  density?: number;      // escala de radio por imagen (0.7–1.4) default 1
  bg?: string;           // color de fondo del canvas (opcional)
  className?: string;    // tailwind del wrapper
};

export default function FloatingLogos({
  logos,
  restitution = 0.9,
  maxSpeed = 0.9,
  density = 1,
  bg,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;

    // --- responsive ---
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      cvs.style.width = r.width + "px";
      cvs.style.height = r.height + "px";
      cvs.width = Math.max(1, Math.floor(r.width * dpr));
      cvs.height = Math.max(1, Math.floor(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("resize", resize);

    // --- world ---
    const R = () => wrap.getBoundingClientRect();
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    type Body = {
      x: number; y: number; vx: number; vy: number;
      r: number; m: number; img: HTMLImageElement;
    };

    // --- cargar imágenes (tolerante a fallos) ---
const bodies: Body[] = [];
    let started = false;
    const startLoop = () => {
      if (!started) {
        started = true;
        loop(performance.now());
      }
    };
 // manejar clicks (se añade al final cuando las imágenes están listas)
    const onClick = (e: MouseEvent) => {
      const r = R();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      bodies.forEach((b) => {
        const dx = b.x - mx, dy = b.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < (b.r + 120) * (b.r + 120)) {
          const d = Math.max(10, Math.sqrt(d2));
          b.vx += (dx / d) * 0.9;
          b.vy += (dy / d) * 0.9;
        }
      });
    };


const total = logos.length;
    let done = 0;
    const maybeStart = () => {
      if (done === total) {
        wrap.addEventListener("click", onClick);
        startLoop();
      }
    };

    logos.forEach((l) => {
      const img = new Image();
      img.decoding = "async";
      img.src = l.src;
      const r = Math.max(16, (l.radius ?? 28) * density);
      const m = l.mass ?? r * r;

      img.onload = () => {
        const { width, height } = R();
        bodies.push({
          x: rand(r, width - r),
          y: rand(r, height - r),
          vx: rand(-0.25, 0.25),
          vy: rand(-0.25, 0.25),
          r,
          m,
          img,
        });
        done++;
        maybeStart();
      };
      img.onerror = () => {
        // si falla, no lo incluimos pero contamos igualmente
        console.warn("[FloatingLogos] No se pudo cargar:", l.src);
        done++;
        maybeStart();
      };
    });


    // --- grilla espacial (para evitar O(n^2)) ---
    let cell = 80; // px
    const grid = new Map<string, number[]>();
    const key = (cx: number, cy: number) => `${cx}|${cy}`;
    const rebuildGrid = () => {
      grid.clear();
      const { width, height } = R();
      cell = Math.max(60, Math.min(140, Math.min(width, height) / 6));
      bodies.forEach((b, i) => {
        const cx = Math.floor(b.x / cell);
        const cy = Math.floor(b.y / cell);
        const k = key(cx, cy);
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k)!.push(i);
      });
    };

    // --- colisión círculo–círculo (impulso + corrección) ---
    const collide = (a: Body, b: Body) => {
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist2 = dx * dx + dy * dy;
      const rSum = a.r + b.r;
      if (dist2 >= rSum * rSum || dist2 === 0) return;

      const dist = Math.sqrt(dist2);
      // Separación mínima (Position Correction)
      const overlap = rSum - dist;
      const nx = dx / dist, ny = dy / dist; // normal
      const totalMass = a.m + b.m;
      const pushA = (overlap * (b.m / totalMass)) * 0.8;
      const pushB = (overlap * (a.m / totalMass)) * 0.8;

      a.x -= nx * pushA; a.y -= ny * pushA;
      b.x += nx * pushB; b.y += ny * pushB;

      // Velocidad relativa
      const rvx = b.vx - a.vx;
      const rvy = b.vy - a.vy;
      const velAlongNormal = rvx * nx + rvy * ny;
      if (velAlongNormal > 0) return;

      const e = restitution;
      const j = (-(1 + e) * velAlongNormal) / (1 / a.m + 1 / b.m);
      const impX = j * nx, impY = j * ny;

      a.vx -= impX / a.m; a.vy -= impY / a.m;
      b.vx += impX / b.m; b.vy += impY / b.m;
    };

    // --- paredes ---
    const walls = (b: Body) => {
      const { width, height } = R();
      if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.95; }
      if (b.x + b.r > width) { b.x = width - b.r; b.vx = -Math.abs(b.vx) * 0.95; }
      if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.95; }
      if (b.y + b.r > height) { b.y = height - b.r; b.vy = -Math.abs(b.vy) * 0.95; }
    };



    // --- loop ---
    let last = 0;
    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const dt = Math.min(32, t - last || 16); // ms
      last = t;

      // físicas básicas
      bodies.forEach((b) => {
        b.vx = Math.max(-maxSpeed, Math.min(maxSpeed, b.vx));
        b.vy = Math.max(-maxSpeed, Math.min(maxSpeed, b.vy));
        b.x += b.vx * dt; b.y += b.vy * dt;
        b.vx *= 0.996; b.vy *= 0.996; // leve damping
        walls(b);
      });

      // colisiones usando grilla
      rebuildGrid();
      const checked = new Set<string>();
      const neighborOffsets = [
        [0, 0],[1, 0],[0, 1],[1, 1],[-1, 0],[0, -1],[-1, -1],[1, -1],[-1, 1],
      ];
      grid.forEach((arr, k) => {
        const [cx, cy] = k.split("|").map(Number);
        neighborOffsets.forEach(([ox, oy]) => {
          const nk = `${cx + ox}|${cy + oy}`;
          const others = grid.get(nk);
          if (!others) return;
          const pairKey = cx <= cx + ox && cy <= cy + oy ? `${k}>${nk}` : `${nk}>${k}`;
          if (checked.has(pairKey)) return;
          checked.add(pairKey);

          for (let i of arr) for (let j of others) {
            if (i >= j) continue;
            collide(bodies[i], bodies[j]);
          }
        });
      });

      // render
      const { width, height } = R();
      if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height); }
      else { ctx.clearRect(0, 0, width, height); }

      bodies.forEach((b) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(b.img, b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
        ctx.restore();

        // borde suave
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r - 0.5, 0, Math.PI * 2);
        ctx.stroke();
      });
    };
    maybeStart(); 
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("click", onClick);
    };
  }, [logos, restitution, maxSpeed, density, bg]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}


