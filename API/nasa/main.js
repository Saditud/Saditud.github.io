function init(){
    const today = new Date();
    const str = `${today.getFullYear()}-${
        (() => today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth())()
    }-${
        (() => today.getDate() < 10 ? '0' + today.getDate() : today.getDate())()
    }`;
    document.getElementById('date').value = str;
    main();
}
function main() {
    const date = document.getElementById('date').value;
     (async () => {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=pKNl8KBBJOaT0gYYRFl0zcPhVHcSgB24qIAUddac`);
        const data = await res.json();
        document.getElementById('image').src = data.url;
        document.getElementById('lk_image').href = data.url;
        document.getElementById('description').textContent = data.explanation;
    })()
}
document.getElementById('date').addEventListener('change', main);
init();