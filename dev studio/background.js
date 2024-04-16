document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = 100; // 普通星星的数量
    const shootingStars = 5; // 流星的数量
    const speed = 0.5; // 星星移动的速度
    let starArray = [];
    let shootingStarArray = [];

    class Star {
        constructor(x, y, size, velocity) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.velocity = velocity;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`; // 半透明效果
            ctx.fill();
        }

        update() {
            this.x -= this.velocity;
            if (this.x < -this.size) {
                this.x = canvas.width + this.size;
                this.y = Math.random() * canvas.height;
                this.velocity = speed * (Math.random() * 0.5 + 0.5);
            }
            this.draw();
        }
    }

    class ShootingStar extends Star {
        constructor(x, y, size, velocity, length) {
            super(x, y, size, velocity);
            this.length = length;
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x + this.length, this.y);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`; // 使流星尾部颜色更亮
            ctx.lineWidth = this.size;
            ctx.stroke();
        }
    }

    function initStars() {
        starArray = [];
        for (let i = 0; i < stars; i++) {
            let size = Math.random() * 3;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let velocity = speed * (Math.random() * 0.5 + 0.5);
            starArray.push(new Star(x, y, size, velocity));
        }
        shootingStarArray = [];
        for (let i = 0; i < shootingStars; i++) {
            let size = Math.random() * 2 + 2; // 流星的大小
            let length = Math.random() * 50 + 50; // 流星尾巴的长度
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let velocity = speed * (Math.random() * 1 + 1); // 流星的速度快于普通星星
            shootingStarArray.push(new ShootingStar(x, y, size, velocity, length));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        starArray.forEach(star => star.update());
        shootingStarArray.forEach(star => star.update());
    }

    initStars();
    animate();

    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    };
});
