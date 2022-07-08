"use strict";
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const Snakes = [];
class Snake {
    constructor(x, y, size = 10, color = "#" + Math.floor(Math.random() * 16777215).toString(16)) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    update() {
        const coef = () => {
            const nb = Math.round(Math.random());
            if (nb === 0)
                return -1;
            return nb;
        };
        this.x += Math.random() * 10 * coef();
        this.y += Math.random() * 10 * coef();
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
}
for (let i = 0; i < 1000; i++)
    Snakes.push(new Snake(Math.random() * canvas.width, Math.random() * canvas.height));
const animate = () => {
    Snakes.forEach((element) => {
        element.update();
        element.draw();
    });
    requestAnimationFrame(animate);
};
animate();
//# sourceMappingURL=main.js.map