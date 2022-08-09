const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Letter {
    constructor(X, Y, letter, color) {
        this.X = X;
        this.Y = Y;
        this.letter = letter;
        this.color = color;
    }
    draw() {
        context.font = '30px serif';
        context.fillStyle = this.color;
        context.fillText(this.letter, this.X, this.Y);
    }
}
class Chain {
    constructor(letters = []) {
        this.letters = letters;
        this.nbcarac = 20; // db 20
        this.getLetter = () => String.fromCharCode(Math.random() * 86 + 0x30a1);
        const X = Math.random() * canvas.width;
        const Y = Math.random() * canvas.height;
        for (let i = this.nbcarac; i > 0; i--)
            letters.push(new Letter(X, Y + (28 * i), this.getLetter(), `hsl(120, 100%, ${((i + 1) * 100) / (this.nbcarac + 1)}%)`));
    }
    update() {
        const saveLetters = this.letters.map((element) => element.letter);
        this.letters.forEach((letter, index) => {
            letter.Y += 28;
            if (index !== 0)
                letter.letter = saveLetters[index - 1];
            else
                letter.letter = this.getLetter();
            if (letter.Y > canvas.height) {
                letter.Y -= canvas.height;
                if (index === 0) {
                    const getCo = () => {
                        let X = Math.random() * canvas.width << 0;
                        while (X % (this.nbcarac * 3) !== 0)
                            X--;
                        if (!chains.every((chain) => chain.letters[0].X !== X)) {
                            getCo();
                            return undefined; // unreachable
                        }
                        return X;
                    };
                    letter.X = getCo();
                }
                else
                    letter.X = this.letters[0].X;
            }
        });
    }
    draw() {
        this.letters.forEach((letter) => letter.draw());
    }
}
const chains = [];
function init(nbChains) {
    for (let i = 0; i < nbChains; i++)
        chains.push(new Chain());
}
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    chains.forEach((element) => {
        element.update();
        element.draw();
    });
}
init(30); // 15 db
setInterval(animate, 60); // 100 db ; 60 modif
window.addEventListener('resize', () => {
    window.location.reload();
});
export {};
//# sourceMappingURL=main.js.map