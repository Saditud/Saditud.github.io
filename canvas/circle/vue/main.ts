const canvas = <HTMLCanvasElement>document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Elipse {
  constructor(public turnposition: number, public clockwise = true) {}
  update(): void {
    if (this.clockwise) {
      if (this.turnposition <= 0) {
        this.clockwise = false;
        this.update();
      }
      this.turnposition -= 1;
    } else {
      if (this.turnposition >= 256) {
        this.clockwise = true;
        this.update();
      }
      this.turnposition += 1;
    }
  }
}

class ElipseStatic extends Elipse {
  constructor(turnposition: number) {
    super(turnposition);
  }
  update(): void {}
}

const elipses: Elipse[] = [];
const nbeli = 6;
for (let i = 0; i < nbeli; i++) {
  let posi = Math.round(((256 * 2) / nbeli) * i);
  if (posi > 256) elipses.push(new Elipse(posi - 256, false));
  else elipses.push(new Elipse(posi));
}
elipses.push(new ElipseStatic(256));

let rotation = 0;
const animate = (): void => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "white";
  context.lineWidth = 2;
  elipses.forEach((element) => {
    element.update();
    context.beginPath();
    context.ellipse(canvas.width / 2, canvas.height / 2, element.turnposition, 256, rotation, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
  });
  rotation += 0.004;
  rotation %= Math.PI * 2;
  requestAnimationFrame(animate);
};

animate();
