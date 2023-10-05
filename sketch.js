let stars = [];
let bgColor;

function setup() {
  createCanvas(550, 450);
  bgColor = setGradient(0, 0, width, height, color(35, 7, 77), color(143, 2, 44));
}

function draw() {
  // Fondo degradado
  background(bgColor);

  for (let star of stars) {
    star.show();
  }
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;
  let radius = random(10, 20); // Tamaño de las estrellas ajustado
  let points = floor(random(4, 6)); // 4 o 5 puntas
  stars.push(new Star(x, y, radius, points));
}

class Star {
  constructor(x, y, radius, points) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.points = points;
    this.growing = true;
    this.minRadius = radius / 2;
    this.maxRadius = radius;
    this.currentRadius = this.maxRadius;
    this.growSpeed = (1.5, 3.5); // Velocidad de crecimiento
  }

  show() {
    // Círculo transparente blanco detrás de la estrella
    fill(200, 120); // Ajusta la opacidad aquí
    ellipse(this.x, this.y, this.currentRadius * 2);

    // Estrella
    fill(255);
    noStroke();
    let angle = TWO_PI / this.points;
    beginShape();
    for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
      let sx = this.x + cos(a) * this.radius;
      let sy = this.y + sin(a) * this.radius;
      vertex(sx, sy);
      let mx = this.x + cos(a + angle / 2) * (this.radius / 2);
      let my = this.y + sin(a + angle / 2) * (this.radius / 2);
      vertex(mx, my);
    }
    endShape(CLOSE);

    // Animación de cambio de tamaño
    if (this.growing) {
      this.currentRadius += this.growSpeed;
      if (this.currentRadius >= this.maxRadius * 2) {
        this.growing = false;
      }
    } else {
      this.currentRadius -= this.growSpeed;
      if (this.currentRadius <= this.minRadius) {
        this.growing = true;
      }
    }
  }
}

function setGradient(x, y, w, h, c1, c2) {
  let colors = [];
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    colors.push(c);
  }
  
  for (let i = 0; i < colors.length; i++) {
    stroke(colors[i]);
    line(x, i + y, x + w, i + y);
  }
  return colors[0];
}

function windowResized() {
  resizeCanvas(550, 450);
  bgColor = setGradient(0, 0, width, height, color(35, 7, 77), color(143, 2, 44));
}

