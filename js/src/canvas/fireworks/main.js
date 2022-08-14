const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Fire {
    constructor(x, y, spx, spy, color) {
        this.x = x;
        this.y = y;
        this.spx = spx;
        this.spy = spy;
        this.color = color;
    }
    update() {
        this.y += this.spy;
        this.x += this.spx;
        this.spy += 0.12;
        if (this.y > canvas.height)
            return true;
        this.draw();
        return false;
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
}
class Firework {
    constructor(x, Fy) {
        this.x = x;
        this.Fy = Fy;
        this.y = canvas.height;
        this.exploded = false;
        this.fires = [];
    }
    update() {
        if (!this.exploded) {
            if (this.y < this.Fy)
                this.explode();
            this.y -= 10;
            this.draw();
        }
        else {
            this.fires = this.fires
                .map((fire) => (fire.update() ? undefined : fire))
                // fire.update() return true if fire.y is out of the screen
                .filter((obj) => obj !== undefined);
            if (this.fires.length === 0)
                return true;
        }
        return false;
    }
    explode() {
        const nbFires = 20;
        const force = 5;
        const color = `hsl(${Math.random() * 360 << 0}, 100%, 50%)`;
        for (let i = 0; i < nbFires; i++)
            this.fires.push(new Fire(this.x, this.y, Math.cos(i) * force, Math.sin(i) * force, color));
        this.exploded = true;
    }
    draw() {
        context.fillStyle = 'yellow';
        context.fillRect(this.x, this.y, 2, 20);
    }
}
let fireworks = [];
document.addEventListener('mousedown', (e) => fireworks.push(new Firework(e.x, e.y)));
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    fireworks = fireworks
        .map((fire) => (fire.update() ? undefined : fire))
        // fire.update() return true if fire.y is out of the screen
        .filter((obj) => obj !== undefined);
    if (Math.random() * 20 << 0 === 0)
        fireworks.push(new Firework(Math.random() * canvas.width, (Math.random() * canvas.height) * (2 / 3)));
    requestAnimationFrame(animate);
}
animate();
export {};
//# sourceMappingURL=main.js.map