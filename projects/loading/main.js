function getPC(start, end, today){
    const centPC = end - start;
    const actPC = today - start;
    const res = actPC * 100 / centPC;
    return res > 100 ? 100 : res;
}

function getTimeLeft(end, today){
    let mili = (end - today) / 1000 << 0;
    console.log(mili)
    let tab = [mili / 86400 << 0];
    mili %= 86400;
    tab.push(mili / 3600 << 0);
    mili %= 3600;
    tab.push(mili / 60 << 0);
    tab.push(mili % 60);
    tab = tab.map(element => element < 10 ? `0${element}` : `${element}`);
    return `${tab[0]}d${tab[1]}h${tab[2]}m${tab[3]}s`
}

const start = new Date('09/2/2022');
const end = new Date('06/25/2023');

setInterval(() => {
    const bar = document.getElementById('bar');
    const remain = document.getElementById('remain');
    today = new Date();
    if(today < start){
        bar.style.width = '0%';
        remain.textContent = 'Not Started Yet';
    } else {
        const actPC = getPC(start, end, today);
        bar.style.width = `${actPC}%`;
        let res = 'Time Left : ';
        actPC !== 100
            ? res += `${getTimeLeft(end, today)}`
            : res += 'Over';
        remain.textContent = res;
    }
}, 1000);