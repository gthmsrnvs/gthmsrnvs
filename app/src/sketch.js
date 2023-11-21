const sketch = (p5) => {
  let nodes = [];

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.style('position', 'absolute'); // Position canvas absolutely
    canvas.style('z-index', '-1');        // Send canvas to back
    canvas.parent('welcome-landing');     // Set the parent to welcome section
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(5, 20)
      });
    }
  };

  p5.draw = () => {
    p5.background(255, 255, 255, 25); // Semi-transparent for trailing effect
    nodes.forEach(node => {
      p5.fill(0, 0, 0, 50);
      p5.noStroke();
      p5.ellipse(node.x, node.y, node.size, node.size);

      // Connect nodes to mouse cursor
      p5.stroke(0, 0, 0, 50);
      p5.line(node.x, node.y, p5.mouseX, p5.mouseY);
    });
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

new p5(sketch);
