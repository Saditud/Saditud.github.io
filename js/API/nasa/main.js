var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    const date = document.getElementById('date').value;
    (() => __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=pKNl8KBBJOaT0gYYRFl0zcPhVHcSgB24qIAUddac`);
        const data = yield res.json();
        document.getElementById('image').src = data.url;
        document.getElementById('lk_image').href = data.url;
        document.getElementById('description').textContent = data.explanation;
    }))();
}
function init() {
    const today = new Date();
    const putZero = (str) => (`${str}`.length === 1 ? `0${str}` : `${str}`);
    const str = `${today.getFullYear()}-${putZero(today.getMonth() + 1)}-${putZero(today.getDate())}`;
    document.getElementById('date').value = str;
    main();
}
document.getElementById('date').addEventListener('change', main);
init();
export {};
//# sourceMappingURL=main.js.map