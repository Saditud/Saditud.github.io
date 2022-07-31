const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Projectile {
    constructor(X, Y, id){
        this.id = id
        this.X = X + 31;
        this.Y = Y;
    }
    update() {
        this.X+=5;
        if (this.X > canvas.width)
            projectiles = [...projectiles.filter(element => element.id !== this.id)];
    }
    draw() {
        context.fillStyle = '#2E67F8';
        context.fillRect(this.X, this.Y, 20, 5);
        context.fill();
    }
}

class Star {
    constructor(){
        this.X = Math.random() * canvas.width;
        this.Y = Math.random() * canvas.height;
    }
    draw() {
        context.fillStyle = 'white';
        context.fillRect(this.X, this.Y, 2, 2);
        context.fill();
    }
}

class Ship {
    constructor() {
        this.Y = canvas.height/2 << 0;
        this.bullets = nb_bullets;
    }
    update(climb) {
        climb ? this.Y-=10 : this.Y+=10;
        if(this.Y > canvas.height) this.Y = canvas.height;
        else if(this.Y < 0) this.Y = 0;
    }
    draw() {
/*         context.fillStyle = 'white';
        context.fillRect(20, this.Y, 10, 10);
        context.fill(); */
        document.getElementById('space-ship').style.top = `${this.Y - 20}px`;
    }
    shoot() {
        if(this.bullets <= 0) return
        const tmp = [];
        projectiles.forEach(element => tmp.push(element.id));
        let id = Math.max(...tmp) + 1;
        if(id === -Infinity) id = 0;
        projectiles.push(new Projectile(20, this.Y, id))
        this.bullets--;
        this.updateBar();
    }
    reload() {
        if(this.bullets === nb_bullets) return
        this.bullets+=1;
        this.updateBar();
    }
    updateBar() {
        document.getElementById('reload').style.width = `${this.bullets * 100 / nb_bullets}%`;
    }
}

const nb_bullets = 10;
const ship = new Ship();
let projectiles = [];

let stars = [];
for(let i=0; i<100; i++)
    stars.push(new Star())

function animate() {
    context.clearRect(0,0,canvas.width,canvas.height)
    ship.draw();
    projectiles.forEach(element => {
        element.update();
        element.draw();
    })
    stars.forEach(element => element.draw())
}

document.addEventListener('keypress', e => {
    if(e.key === 's') ship.update(false)
    else if(e.key === 'z') ship.update(true)
    else if(e.key === ' ') ship.shoot()
    else if(e.key === 'r') ship.reload()
})

setInterval(animate, 1);