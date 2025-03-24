const sketch = (p) => {
    let raqueta1, raqueta2, pelota;
    let puntaje1 = 0, puntaje2 = 0;
    
    let puntajeMaximo = 10;


    p.setup = function () {
        p.createCanvas(800, 400);
        raqueta1 = new Raqueta(20);
        raqueta2 = new Raqueta(p.width - 30);
        pelota = new Pelota();
    };

    p.draw = function () {
        p.background(255, 182, 193); // Fondo rosa

        raqueta1.mostrar();
        raqueta2.mostrar();
        raqueta1.actualizar();
        raqueta2.actualizar();

        pelota.mostrar();
        pelota.actualizar();
        pelota.verificarColision(raqueta1);
        pelota.verificarColision(raqueta2);

        // Mostrar el puntaje
        p.fill(255);
        p.textSize(32);
        p.text(puntaje1, p.width / 4, 50);
        p.text(puntaje2, (p.width / 4) * 3, 50);

        // Verificar si alguien gana xd
        if (puntaje1 >= puntajeMaximo || puntaje2 >= puntajeMaximo) {
            p.noLoop();

            p.textAlign(p.CENTER, p.CENTER);
            p.text("Juego Terminado", p.width / 2, p.height / 2);
        }
    };





    p.keyPressed = function () {
        if (p.key === 'W' || p.key === 'w') raqueta1.mover(-10);
        if (p.key === 'S' || p.key === 's') raqueta1.mover(10);
        if (p.keyCode === p.UP_ARROW) raqueta2.mover(-10);
        if (p.keyCode === p.DOWN_ARROW) raqueta2.mover(10);
    };

    p.keyReleased = function () {
        if (p.key === 'W' || p.key === 'w' || p.key === 'S' || p.key === 's') raqueta1.detener();
        if (p.keyCode === p.UP_ARROW || p.keyCode === p.DOWN_ARROW) raqueta2.detener();
    };

    class Raqueta {
        constructor(x) {
            this.x = x;
            this.y = p.height / 2 - 40;
            this.ancho = 10;
            this.alto = 80;
            this.velocidad = 0;
        }
        mostrar() {
            p.fill(255);
            p.rect(this.x, this.y, this.ancho, this.alto);
        }
        actualizar() {
            this.y += this.velocidad;
            this.y = p.constrain(this.y, 0, p.height - this.alto);
        }
        mover(velocidad) {
            this.velocidad = velocidad;
        }
        detener() {
            this.velocidad = 0;
        }
    }

    class Pelota {

        constructor() {
            this.reiniciar();

        }
        reiniciar() {

            this.x = p.width / 2;
            this.y = p.height / 2;
            this.vx = p.random([-5,5]);
            this.vy = p.random([-3,3]);
        }
        mostrar() {
            p.fill(255);
            p.ellipse(this.x, this.y,15);
        }
        actualizar() {
            this.x += this.vx;

            this.y += this.vy;

            // Rebota contra los bordes superior e inferior
            if (this.y < 0 || this.y > p.height) {

                this.vy *= -1;

            }

            // Si sale por los lados, se reinicia y se suma punto
            if (this.x < 0) {

                puntaje2++;
                this.reiniciar();

            } else if (this.x > p.width) 
            {
                puntaje1++;

                this.reiniciar();
            }
        }
        verificarColision(raqueta) 
        {
            if (this.x - 7.5 < raqueta.x + raqueta.ancho && this.x + 7.5 > raqueta.x && this.y > raqueta.y && this.y < raqueta.y + raqueta.alto) {
                this.vx *= -1.1; // Cambia dirección y aumenta velocidad
                this.vy *= 1.1;
            }
        }
    }
};

new p5(sketch);
