/* johnmcgovern.com — starfield background */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var canvas = document.getElementById("starfield");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var stars = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  // A few stars get a faint color tint from the brand palette.
  var tints = ["#5b8cff", "#a06bff", "#ff5468"];

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    var count = Math.min(220, Math.floor((window.innerWidth * window.innerHeight) / 6500));
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.1 + 0.3) * dpr,
        base: Math.random() * 0.55 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.9 + 0.3,
        drift: (Math.random() * 0.02 + 0.005) * dpr,
        tint: Math.random() < 0.12 ? tints[(Math.random() * tints.length) | 0] : "#ffffff"
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var alpha = s.base;
      if (!prefersReducedMotion) {
        alpha = s.base * (0.6 + 0.4 * Math.sin(s.phase + t * 0.001 * s.speed));
        s.y -= s.drift;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
      }
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.tint;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
})();
