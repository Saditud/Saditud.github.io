"use strict";
function getPC(start, end, today) {
    const centPC = end.getTime() - start.getTime();
    const actPC = today.getTime() - start.getTime();
    const res = (actPC * 100) / centPC;
    return res > 100 ? 100 : res;
}
function getTimeLeft(end, today) {
    let mili = (end.getTime() - today.getTime()) / 1000 << 0;
    const tab = [`${mili / 86400 << 0}d`];
    mili %= 86400;
    tab.push(`${mili / 3600 << 0}h`);
    mili %= 3600;
    tab.push(`${mili / 60 << 0}m`);
    tab.push(`${mili % 60}s`);
    return tab.map((element) => (element.length <= 2
        ? `0${element}`
        : element)).join(' ');
}
let start = new Date('06/20/2022');
let today = new Date();
let end = new Date('09/02/2022');
// vacances
function formatDate(date) {
    const tmp = date.split('/').map((element) => (element.length <= 1
        ? `0${element}`
        : element));
    return `${tmp[2]}-${tmp[0]}-${tmp[1]}`;
}
/* [...<HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName('input-date')]
    .forEach((element, index) => {
        element.value = formatDate(tab[index].toLocaleDateString());
        element.addEventListener(
            'change',
            (e) => tab[index] = new Date((<HTMLInputElement>e.target).value),
        );
    }); */
const todayElement = document.getElementById('today');
todayElement.value = formatDate(today.toLocaleDateString());
todayElement.addEventListener('change', (e) => today = new Date(e.target.value));
const startElement = document.getElementById('start');
startElement.value = formatDate(start.toLocaleDateString());
startElement.addEventListener('change', (e) => start = new Date(e.target.value));
const endElement = document.getElementById('end');
endElement.value = formatDate(end.toLocaleDateString());
endElement.addEventListener('change', (e) => end = new Date(e.target.value));
// A refaire
setInterval(() => {
    today = new Date();
    const bar = document.getElementById('bar');
    const remain = document.getElementById('remain');
    if (today < start) {
        bar.style.width = '0%';
        remain.textContent = 'Not Started Yet';
    }
    else {
        const actPC = getPC(start, end, today);
        bar.style.width = `${actPC}%`;
        remain.textContent = `Time Left : ${actPC !== 100
            ? `${getTimeLeft(end, today)}`
            : 'Over'}`;
    }
}, 1000);
//# sourceMappingURL=main.js.map