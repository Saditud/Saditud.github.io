function getPC(start, end, today){
    const centPC = end - start;
    const actPC = today - start;
    const res = actPC * 100 / centPC;
    return res > 100 ? 100 : res;
}

function getTimeLeft(end, today){
    let mili = (end - today) / 1000 << 0;
    const tab = [`${mili / 86400 << 0}d`];
    mili %= 86400;
    tab.push(`${mili / 3600 << 0}h`);
    mili %= 3600;
    tab.push(`${mili / 60 << 0}m`);
    tab.push(`${mili % 60}s`);
    return tab.map(element => element.length <= 2 
        ? `0${element}` 
        : element).join(' ');
}

let start = new Date('06/20/2022');
let end = new Date('09/02/2022');

function formatDate(date) {
    const tmp = date.split('/').map(element => element.length <= 1 
        ? `0${element}` 
        : element);
    return `${tmp[2]}-${tmp[0]}-${tmp[1]}`;
}

const startElement = document.getElementById('start');
const endElement = document.getElementById('end');

startElement.value = formatDate(start.toLocaleDateString());
startElement.addEventListener('change', e => start = new Date(e.target.value));

endElement.value = formatDate(end.toLocaleDateString());
endElement.addEventListener('change', e => end = new Date(e.target.value));



setInterval(() => {
    const bar = document.getElementById('bar');
    const remain = document.getElementById('remain');
    today = new Date();
    if(today < start){j
        bar.style.width = '0%';
        remain.textContent = 'Not Started Yet';
    } else {
        const actPC = getPC(start, end, today);
        bar.style.width = `${actPC}%`;
        remain.textContent = 'Time Left : ' + actPC !== 100
            ? `${getTimeLeft(end, today)}`
            : 'Over';
    }
}, 1000);