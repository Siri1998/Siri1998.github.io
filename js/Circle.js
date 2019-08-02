class Circle {
    get left() {
        return this._left;
    }

    get top() {
        return this._top;
    }

    set left(x) {
        let deg = 0;
        if (this._left - x > 0) {
            deg = 180;
        }
        this._left = x;
        this.element.css({
            left: x,
            transform: `rotate(${deg}deg`
        });
    }

    set top(y) {
        let deg = 90;
        if (this._top - y > 0) {
            deg = 270;
        }
        this._top = y;
        this.element.css({
            top: y,
            transform: `rotate(${deg}deg`
        });
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
        this.element.css({
            width: size,
            height: size
        });
    }



    constructor(player_id, left, top, ) {
        this._left = left;
        this._top = top;
        this._size = 50;
        this.step = 5;
        this.speed = 20;
        this.interval = null;
        const element = $('<div/>', {
            class: `circle player-${player_id}`,
        });
        this.element = element;
        this.element.appendTo('#games');
        this.left = this._left;
        this.top = this._top;
        this.size = this._size;
    }

    moveRight() {
        if (this.left <= window.innerWidth - this.element.width()) {
            this.left += this.step;
        }
    }
    moveLeft() {
        if (this.left >= 0) {
            this.left -= this.step;
        }
    }
    moveUp() {
        if (this.top >= 0) {
            this.top -= this.step;
        }
    }
    moveDown() {
        if (this.top <= window.innerHeight - this.element.height()) {
            this.top += this.step;
        }
    }
    moveUpRight() {
        this.moveUp();
        this.moveRight();
    }

    moveUpLeft() {
        this.moveUp();
        this.moveLeft();
    }

    moveDownRight() {
        this.moveDown();
        this.moveRight();
    }

    moveDownLeft() {
        this.moveDown();
        this.moveLeft();
    }

    stop() {
        clearInterval(this.interval);
    }

    move(fnName) {
        this.stop();
        this.interval = setInterval(() => {
            this[fnName]();

            if (this.moveListener) {
                this.moveListener()
            }
        }, this.speed);
    }

    onMove(callback) {
        this.moveListener = callback;
    }

}