export {};
const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Snake {
    constructor(
    public x: number,
    public y: number,
    public size = 10,
    public color = `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    ) {}

    update() {
        const coef = (): number => {
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
const Snakes: Snake[] = [];

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
