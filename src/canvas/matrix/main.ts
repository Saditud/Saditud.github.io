export {};
const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Chain {
    public Y = Math.random() * canvas.height;

    public X = Math.random() * canvas.width;

    getLetter(): string {
    // http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
        /*
    // Letters
     if(Math.round(Math.random()) == 0)
      return String.fromCharCode(Math.random() * 26 + 97)
    else
      return String.fromCharCode(Math.random() * 26 + 65)

    // Binary
    return `${Math.round(Math.random())}`;
 */
        // Japanese
        return String.fromCharCode(Math.random() * 86 + 0x30a1);
    }

    update() {
        if (this.Y >= canvas.height) {
            this.Y = 0;
            this.X = Math.random() * canvas.width;
        } else
            this.Y += 28;
    }

    draw() {
        context.font = '30px serif';
        context.fillStyle = '#00c407';
        context.fillText(this.getLetter(), this.X, this.Y);
    }
}

const chains: Chain[] = [];
function init(nbChains: number) {
    for (let i = 0; i < nbChains; i++)
        chains.push(new Chain());
}

function animate() {
    context.fillStyle = 'rgba(0, 0, 0, 0.06)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    chains.forEach((element) => {
        element.update();
        element.draw();
    });
}

init(20);
setInterval(animate, 25);
