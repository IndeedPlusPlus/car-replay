/**
 * Created by indeed on 14-7-9.
 */

const STEP_INTERVAL = 1000;
const ANIMATION_INTERVAL = 500;

function Step(id, type) {
    this.id = id;
    this.type = type;
}

function Car(id, width, height, row, column, color) {
    this.id = id;
    this.x = column;
    this.y = row;
    this.width = width;
    this.height = height;
    this.currentX = this.finalX = (this.x - 1) * 100 + 10;
    this.currentY = this.finalY = (this.y - 1) * 100 + 10;
    this.color = color || 'green';
    this.forward = function () {
        if (this.height > this.width)
            ++this.y;
        else
            ++this.x;
        this.startAnimate();
    };
    this.backward = function () {
        if (this.height > this.width)
            --this.y;
        else
            --this.x;
        this.startAnimate();
    };
    this.startAnimate = function () {
        this.finalX = (this.x - 1) * 100 + 10;
        this.deltaX = (this.finalX - this.currentX) / 50.0;
        this.finalY = (this.y - 1) * 100 + 10;
        this.deltaY = (this.finalY - this.currentY) / 50.0;
    };
    this.animate = function () {
        if (Math.abs(this.currentX - this.finalX) < 1e-6 && Math.abs(this.currentY - this.finalY) < 1e-6) {
            this.currentX = this.finalX;
            this.currentY = this.finalY;
            return false;
        }
        this.currentX += this.deltaX;
        this.currentY += this.deltaY;
        return true;
    };
    this.draw = function (canvas) {
        var context = canvas.getContext('2d');
        context.pathRoundedRect = function (x, y, width, height, r) {
            this.beginPath();
            this.moveTo(x + r, y);

            this.lineTo(x + width - r, y);
            this.quadraticCurveTo(x + width, y, x + width, y + r);
            this.lineTo(x + width, y + height - r);
            this.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
            this.lineTo(x + r, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - r);
            this.lineTo(x, y + r);
            this.quadraticCurveTo(x, y, x + r, y);
        };

        context.beginPath();
        context.pathRoundedRect(this.currentX, this.currentY, 100 * this.width - 20, 100 * this.height - 20, 10);
        context.fillStyle = this.color;
        context.fill();
    }
}

function Board(cars) {
    this.height = 6;
    this.width = 6;
    this.cars = cars;
}

function Replay(steps, canvas, board) {
    this.steps = steps;
    this.canvas = canvas;
    this.board = board;
    this.currentStep = 0;
    this.exitX = 3;
    this.exitY = 5;
    this.drawGird = function () {
        var context = this.canvas.getContext('2d');

        /* draw exit */
        context.beginPath();
        context.rect(100 * this.exitX, 100 * this.exitY, 100, 100);
        context.fillStyle = '#4F78FD';
        context.fill();

        context.beginPath();
        for (var i = 0; i <= 6; ++i) {
            context.moveTo(i * 100, 0);
            context.lineTo(i * 100, 600);
            context.moveTo(0, i * 100);
            context.lineTo(600, i * 100);
        }
        context.lineWidth = 1;
        context.stroke();
    };

    this.drawCars = function () {
        var cars = this.board.cars;
        for (var i = 0; i < cars.length; ++i) {
            cars[i].animate();
            cars[i].draw(this.canvas);
        }
    };

    this.redraw = function () {
        var context = this.canvas.getContext('2d');
        context.clearRect(0, 0, 600, 600);
        this.drawGird();
        this.drawCars();
    };

    this.nextStep = function () {
        if (this.currentStep >= this.steps.length)
            return false;
        var step = this.steps[this.currentStep++];
        var car = this.board.cars[step.id - 1];
        if (step.type == 'forward')
            car.forward();
        else
            car.backward();
        return true;
    }
}
