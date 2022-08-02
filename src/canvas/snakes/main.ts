const { createNoise2D } = require('simplex-noise');

const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
const context = canvas.getContext('2d');
const noise2D = createNoise2D();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Snake {
    public x: number;

    public y: number;

    public size = 10;
    /*
    public color = `#${Array(6).fill('')
        .map(() => (Math.random() * 0xF << 0).toString(16))
        .join('')}`; */

    public seed = Math.random() * 10000;

    constructor(public color: string) { }

    update(time: number) {
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

const Snakes: Snake[] = [];

for (let i = 0; i < 300; i++)
    Snakes.push(new Snake(`hsl(${(360 / 300) * i}, 70%, 50%)`));

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
