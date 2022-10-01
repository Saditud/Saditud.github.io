export {};

const LTDate = '2022-10-01';
const LTHour = '17:00';

(<HTMLInputElement>document.getElementById('inputDate')).value = LTDate;
(<HTMLInputElement>document.getElementById('inputTime')).value = LTHour;
const lastTime = new Date(`${LTDate}T${LTHour}`);

const putZero = (nb: string): string => (`${nb}`.replace(/[a-zA-Z]+/g, '').length === 1 ? `0${nb}` : `${nb}`);

function getTimeLeft(end: Date, today: Date): string {
    let mili = (end.getTime() - today.getTime()) / 10 << 0;
    const tab = [`${mili / 8640000 << 0}d`];
    mili %= 8640000;
    tab.push(`${mili / 360000 << 0}h`);
    mili %= 360000;
    tab.push(`${mili / 6000 << 0}m`);
    mili %= 6000;
    tab.push(`${mili / 100 << 0}s`);
    tab.push(`${mili % 100}ms`);
    return tab.map((element) => putZero(element)).join(' ');
}

const p = <HTMLParagraphElement>document.getElementById('timer');
setInterval(() => p.textContent = getTimeLeft(new Date(), lastTime), 10);
