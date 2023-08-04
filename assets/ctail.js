const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
let spots = []; // Array of particles
let hue = 0; // control the color of the particles.

// store the current x and y position of the mouse
const mouse = {
    x: undefined,
    y: undefined
}

/* Event Listeners
    1. When the mouse moves, we want to store the current x and y position of the mouse.
    2. When the mouse moves, we want to create 3 particles at the current x and y position of the mouse.
    3. When the mouse moves, we want to change the hue value.
    4. When the window is resized, we want to resize the canvas.
    5. When the mouse leaves the window, we want to reset the x and y position of the mouse.
*/
canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 3; i++) {
        spots.push(new Particle());
    }
});
 

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = 'hsl(' + hue + ',100%,50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.1) this.size -= 0.03;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
    }
}

/* function to handle particles
    1. Loop through the spots array and update each particle.
    2. Loop through the spots array and draw each particle.
    3. Loop through the spots array and connect each particle with a line.
    4. If the size of the particle is less than 0.3, remove it from the spots array.
 */

function handleParticles() {
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (let j = i; j < spots.length; j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 90){
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 10;
                ctx.moveTo(spots[i].x,spots[i].y);
                ctx.lineTo(spots[j].x,spots[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(spots[i].size <= 0.3){
            spots.splice(i,1);
            i--;
        }
    }
}

/* function to animate the particles 
    1. Clear the canvas.
    2. Call the handleParticles function.
    3. Increment the hue value.
    4. Call the animate function using requestAnimationFrame.
    5. Add an event listener for when the window is resized.
    6. Add an event listener for when the mouse leaves the window.
*/

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleParticles();
    hue ++;
    requestAnimationFrame(animate);
}

/* function to resize the canvas
    1. Resize the canvas to the innerWidth and innerHeight of the window.
    2. Call the init function.
*/
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* function to initialize the canvas
    1. Call the init function.
*/
window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});
animate();