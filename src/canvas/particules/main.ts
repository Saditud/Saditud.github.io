export {};
const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const divElement = <HTMLDivElement>document.getElementById('brick');
let divMeasurements = divElement.getBoundingClientRect();
let div = {
    x: divMeasurements.left,
    y: divMeasurements.top,
    width: divMeasurements.width,
    height: divMeasurements.height,
};

class Particule {
    constructor(
    public x: number,
    public y: number,
    public size = Math.random() * 7 + 1,
    public weight = Math.random() * 3 + 1,
    public directionX = -1,
    ) {}

    update() {
        if (this.y > canvas.height || this.x < 0) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 3 + 1;
            this.x = Math.random() * canvas.width * 1.3;
        }
        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;
        if (
            this.x < div.x + div.width
      && this.x + this.size > div.x
      && this.y < div.y + div.height
      && this.y + this.size > div.y
        ) {
            this.y -= 3;
            this.weight *= -0.3;
        }
    }

    draw() {
        context.fillStyle = 'blue';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
}
const ArrayParti: Particule[] = [];

function init(): void {
    while (ArrayParti.length !== 0)
        ArrayParti.pop();
    for (let i = 0; i < 100; i++)
        ArrayParti.push(
            new Particule(Math.random() * canvas.width, Math.random() * canvas.height),
        );
}

function animate() {
    context.fillStyle = 'rgba(255, 255, 255, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    ArrayParti.forEach((element) => {
        element.update();
        element.draw();
    });
    context.fillRect(div.x, div.y, div.width, div.height);
    requestAnimationFrame(animate);
}

animate();
init();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    divMeasurements = divElement.getBoundingClientRect();
    div = {
        x: divMeasurements.left,
        y: divMeasurements.top,
        width: divMeasurements.width,
        height: divMeasurements.height,
    };
    init();
});
