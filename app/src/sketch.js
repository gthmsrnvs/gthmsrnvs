import 'p5';

const sketch = (p5) => {
  let stars = [];

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.position(0, 0);
    for (let i = 0; i < 500; i++) {
      let star = {
        x: p5.random(0, p5.width),
        y: p5.random(0, p5.height),
        size: p5.random(1, 3)
      };
      stars.push(star);
    }
    p5.frameRate(30);
  };

  p5.draw = () => {
    p5.background(0, 20);

    for (let star of stars) {
      if (p5.dist(p5.mouseX, p5.mouseY, star.x, star.y) < 50) {
        p5.fill(p5.random(100, 255), p5.random(100, 255), p5.random(100, 255));
        drawStar(star.x, star.y, star.size * 10, star.size, 5);
      } else {
        p5.fill(255);
        drawStar(star.x, star.y, star.size, star.size / 2, 5);
      }
    }
  };

  function drawStar(x, y, radius1, radius2, npoints) {
    let angle = p5.TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    p5.beginShape();
    for (let a = 0; a < p5.TWO_PI; a += angle) {
      let sx = x + p5.cos(a) * radius2;
      let sy = y + p5.sin(a) * radius2;
      p5.vertex(sx, sy);
      sx = x + p5.cos(a + halfAngle) * radius1;
      sy = y + p5.sin(a + halfAngle) * radius1;
      p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

new p5(sketch);
