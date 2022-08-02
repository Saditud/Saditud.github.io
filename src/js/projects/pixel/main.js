"use strict";
function rgb(r = false, g = false, b = false) {
    const getColor = () => ((Math.random() * 0xff) << 0).toString(16);
    const tab = [r, g, b];
    let str = '#';
    tab.forEach((element) => (element ? (str += 'FF') : (str += getColor())));
    return str;
}
function mir() {
    const color = ((Math.random() * 0xff) << 0).toString(16);
    return `#${color.repeat(3)}`;
}
function main() {
    const canvas = document.getElementById('canvas1');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    document.querySelectorAll('.filling_selection').forEach((element) => (element.hidden = true));
    const fillingChoice = document.getElementById('slt_filling').value;
    document.getElementById(fillingChoice).hidden = false;
    const size = +document.getElementById('input_size').value;
    if (size <= 0)
        return;
    const hue = (Math.random() * 360) << 0;
    for (let Y = 0; Y <= canvas.height; Y += size) {
        for (let X = 0; X <= canvas.width; X += size) {
            switch (fillingChoice) {
                case 'random': {
                    context.fillStyle = rgb(false, false, false);
                    break;
                }
                case 'rainbow': {
                    const spread = +document.getElementById('input_spread').value / 10;
                    if (spread <= 0)
                        return;
                    context.fillStyle = `hsl(${hue + X * spread},100%, 50%)`;
                    break;
                }
                case 'static': {
                    const tab = [];
                    document.querySelectorAll('.chk_colors').forEach((element) => {
                        tab.push(element.checked);
                    });
                    context.fillStyle = rgb(tab[0], tab[1], tab[2]);
                    break;
                }
                case 'b&w': {
                    context.fillStyle = mir();
                    break;
                }
                default: {
                    context.fillStyle = document.getElementById('input_colorpick').value;
                }
            }
            context.fillRect(X, Y, size, size);
            context.fill();
        }
    }
    document.querySelectorAll('.drawing_selection').forEach((element) => (element.hidden = true));
    const drawingChoise = document.getElementById('slt_drawing').value;
    document.getElementById(drawingChoise).hidden = false;
    // drawing
    let isDrawing = false;
    canvas.onmousedown = () => (isDrawing = true);
    canvas.onmouseup = () => (isDrawing = false);
    canvas.onmousemove = (e) => {
        const drawingSize = +document.getElementById('input_drawing_size').value;
        if (!isDrawing || drawingSize <= 0)
            return;
        let X = e.clientX << 0;
        let Y = e.clientY << 0;
        while (X % drawingSize !== 0)
            X--;
        while (Y % drawingSize !== 0)
            Y--;
        const choice = document.getElementById('slt_drawing').value;
        switch (choice) {
            case 'color2': {
                context.fillStyle = document.getElementById('input_colorpick_drawing').value;
                break;
            }
            case 'random': {
                context.fillStyle = rgb();
                break;
            }
            default: {
                const spread = +document.getElementById('input_spread_drawing').value / 10;
                if (spread <= 0)
                    return;
                context.fillStyle = `hsl(${hue + X * spread},100%, 50%)`;
            }
        }
        context.fillRect(X, Y, drawingSize, drawingSize);
        context.fill();
    };
}
/* function init() {
    // à voir si je laisse ou je mets dans l'HTML
    (<HTMLInputElement>document.getElementById('input_size')).value = '40';
    (<HTMLInputElement>document.getElementById('input_drawingSize')).value = '40';
    (<HTMLInputElement>document.getElementById('input_spread')).value = '2';
    (<HTMLInputElement>document.getElementById('input_spread_drawing')).value = '2';
    main();
}
init(); */
document.getElementById('slt_drawing').addEventListener('change', () => {
    document.querySelectorAll('.drawing_selection').forEach((element) => (element.hidden = true));
    const drawingChoise = document.getElementById('slt_drawing').value;
    document.getElementById(drawingChoise).hidden = false;
});
document.getElementById('input_size').addEventListener('change', () => {
    document.getElementById('input_drawing_size').value = document.getElementById('input_size').value;
    main();
});
document.querySelectorAll('.reload_on_change').forEach((element) => {
    element.addEventListener('change', main);
});
document.getElementById('lk_reset').addEventListener('click', main);
// menu déroulant
let menuShow = true;
document.querySelector('#lk_wrap').addEventListener('click', () => {
    const arrow = document.getElementById('lk_wrap');
    const menu = document.getElementById('menu');
    menu.removeAttribute('class');
    if (menuShow) {
        menu.classList.add('wrap_down');
        arrow.textContent = '>';
    }
    else {
        menu.classList.add('wrap_up');
        arrow.textContent = '<';
    }
    menuShow = !menuShow;
});
main();
//# sourceMappingURL=main.js.map