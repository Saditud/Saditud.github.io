export {};

const fPutZero = (nb: number): string => (`${nb}`.length === 1 ? `0${nb}` : `${nb}`);

function fGetTime(): string {
    const today = new Date();
    const tmphh = today.getHours();
    const hh = fPutZero(tmphh >= 12 ? tmphh - 12 : tmphh);
    const mm = fPutZero(today.getMinutes());
    const ss = fPutZero(today.getSeconds());
    const ms = fPutZero(today.getMilliseconds() / 10 << 0);
    const md = tmphh >= 12 ? 'PM' : 'AM';
    return `${hh}:${mm}:${ss}:${ms} ${md}`;
}
const h1 = <HTMLHeadingElement>document.getElementById('clock');
setInterval(() => h1.textContent = fGetTime(), 10);
