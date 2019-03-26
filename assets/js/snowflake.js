var canvas,
  g,
  iv,
  index = 4,
  w = 15,
  h = 12,
  speed = 0.5;
var flakes = [];

onload = function() {
  canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  g = canvas.getContext("2d");
  g.strokeStyle = "black";

  for (var i = 0; i < 25; i++) {
    flakes.push({
      x: Math.random() * canvas.width,
      y: (Math.random() * canvas.height) / -3,
      index: Math.round(Math.random() + 2),
      scale: Math.random() * 2 + 1
    });
  }

  draw();

  /* 
recurse(
canvas.width / 5,
canvas.height / 3,
canvas.width / 5 * 4,
canvas.height / 3, index);

recurse(
canvas.width / 5 * 4,
canvas.height / 3, 
canvas.width / 2,
canvas.height / 4 * 3, index);

recurse(
canvas.width / 2,
canvas.height / 4 * 3, 
canvas.width / 5,
canvas.height / 3, index);
*/
};

function draw() {
  g.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < flakes.length; i++) {
    recurse(
      flakes[i].x,
      flakes[i].y,
      flakes[i].x + w * flakes[i].scale,
      flakes[i].y,
      flakes[i].index
    );

    recurse(
      flakes[i].x + w * flakes[i].scale,
      flakes[i].y,
      flakes[i].x + (w * flakes[i].scale) / 2,
      flakes[i].y + h * flakes[i].scale,
      flakes[i].index
    );

    recurse(
      flakes[i].x + (w * flakes[i].scale) / 2,
      flakes[i].y + h * flakes[i].scale,
      flakes[i].x,
      flakes[i].y,
      flakes[i].index
    );

    flakes[i].y += speed * flakes[i].scale + (flakes[i].y / canvas.height) * 5;
    if (flakes[i].y > canvas.height) {
      flakes[i] = {
        x: Math.random() * canvas.width - 20,
        y: -45,
        index: Math.round(Math.random() + 2),
        scale: Math.random() * 2 + 1
      };
    }
  }

  requestAnimationFrame(draw);
}

function recurse(x1, y1, x2, y2, index) {
  if (index - 1 < 1) {
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.stroke();
    return;
  }

  var dx = x2 - x1;
  var dy = y2 - y1;
  var dist = Math.sqrt(dx * dx + dy * dy);
  var angle = Math.atan2(dy, dx);

  var nx1 = x1 + dx / 3;
  var ny1 = y1 + dy / 3;

  var nx2 = x2 - dx / 3;
  var ny2 = y2 - dy / 3;

  var nx3 = nx1 + Math.cos(angle - Math.PI / 3) * (dist / 3);
  var ny3 = ny1 + Math.sin(angle - Math.PI / 3) * (dist / 3);

  recurse(x1, y1, nx1, ny1, index - 1);
  recurse(nx2, ny2, x2, y2, index - 1);
  recurse(nx1, ny1, nx3, ny3, index - 1);
  recurse(nx3, ny3, nx2, ny2, index - 1);
}
