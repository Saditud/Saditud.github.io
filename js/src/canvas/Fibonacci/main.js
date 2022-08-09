const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = Math.random() * 360;
let number = 0;
let scale = 5;
function drawFlower() {
    let angle = number * 2000;
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + canvas.width / 2;
    let positionY = radius * Math.cos(angle) + canvas.height / 2;
    context.fillStyle = `hsl(${hue},100%, 50%)`;
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.beginPath();
    context.arc(positionX, positionY, 20, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.stroke();
    number++;
    hue += 0.025;
}
function animate() {
    drawFlower();
    // requestAnimationFrame(animate);
    setTimeout(animate, 1);
    // animate();
}
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
animate();
export {};
/*
    context.clearRect(0, 0, canvas.width, canvas.height);
   positionX += 2 * Math.sin(angle);
  positionY += 2 * Math.cos(angle);
  angle += 0.01;
  size += 0.01; */
//# sourceMappingURL=main.js.map