"use strict";
const { createNoise2D } = require('simplex-noise');
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const noise2D = createNoise2D();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Snake {
    constructor(color) {
        this.color = color;
        this.size = 6;
        /*
        public color = `#${Array(6).fill('')
            .map(() => (Math.random() * 0xF << 0).toString(16))
            .join('')}`; */
        this.seed = Math.random() * 10000;
    }
    update(time) {
        this.x = noise2D(time, this.seed) * (canvas.width / 2) + canvas.width / 2;
        this.y = noise2D(time + 200, this.seed + 200) * (canvas.height / 2) + canvas.height / 2;
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
}
const nbSnakes = 10;
const Snakes = [];
for (let i = 0; i < nbSnakes; i++)
    Snakes.push(new Snake(`hsl(${Math.random() * 1000 + ((360 / nbSnakes) * i)}, 70%, 50%)`));
let time = 0;
const animate = () => {
    Snakes.forEach((element) => {
        element.update(time);
        element.draw();
    });
    // time += 0.0005; // normal speed
    time += 0.0009;
    requestAnimationFrame(animate);
};
animate();
//# sourceMappingURL=main.js.map