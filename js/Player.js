class Player {

    constructor(id, controlKeys = {}, ) {
        this.id = id;
        this.key = parseInt(Math.random() * 100)
        this.initCircle();
        this.activeKeys = [];

        this.score = 0;

        this.controlKeys = {
            'UP': 38,
            'DOWN': 40,
            'LEFT': 37,
            'RIGHT': 39,
            ...controlKeys,
        }

        this.controlFunctions = {
            [this.controlKeys['UP']]: 'moveUp',
            [this.controlKeys['DOWN']]: 'moveDown',
            [this.controlKeys['LEFT']]: 'moveLeft',
            [this.controlKeys['RIGHT']]: 'moveRight',

        };

        this.controlMultiFunctions = [{
            key: [this.controlKeys['UP'], this.controlKeys['LEFT']],
            fnName: 'moveUpLeft',
        }, {
            key: [this.controlKeys['UP'], this.controlKeys['RIGHT']],
            fnName: 'moveUpRight',
        }, {
            key: [this.controlKeys['DOWN'], this.controlKeys['LEFT']],
            fnName: 'moveDownLeft',
        }, {
            key: [this.controlKeys['DOWN'], this.controlKeys['RIGHT']],
            fnName: 'moveDownRight',
        }];

        this.controlKeyCodes = Object.values(this.controlKeys);
        this.listenKeyboardEvents();

    }

    initCircle() {
        this.circle = new Circle(this.id, _.random(0, (window.innerWidth) - 50), _.random(0, (window.innerHeight) - 50));
        this.circle.onMove(this.onCircleMove.bind(this));
    }

    compareArrays(array1, array2) {
        return array1.length === array2.length && array1.sort().every(function(value, index) {
            return value === array2.sort()[index]
        });
    }

    listenKeyboardEvents() {
        $(document).on(`keydown.${this.key}`, this.onKeyDown.bind(this));
        $(document).on(`keyup.${this.key}`, this.onKeyUp.bind(this));
    }

    onKeyDown(jqueryEvent) {
        if (this.activeKeys.length > 2) {
            return;
        }

        if (this.controlKeyCodes.includes(jqueryEvent.which) && !this.activeKeys.includes(jqueryEvent.which)) {
            this.activeKeys.push(jqueryEvent.which);
            this.moveCircle();
        }
    }

    onKeyUp(jqueryEvent) {
        if (this.activeKeys.includes(jqueryEvent.which)) {
            const index = this.activeKeys.indexOf(jqueryEvent.which);
            this.activeKeys.splice(index, 1);

            if (this.activeKeys.length) {
                this.moveCircle();
            } else {
                this.circle.stop();
            }
        }
    }

    moveCircle() {
        if(game.isFinished) return;

        if (this.activeKeys.length === 2) {
            const sumOfKeyCodes = this.activeKeys[0] + this.activeKeys[1];
            const itemControl = this.controlMultiFunctions.find(item => {
                return this.compareArrays(item.key, this.activeKeys)
            });

            if (itemControl) {
                this.circle.move(itemControl.fnName);
            } else {
                this.circle.stop();
            }

        } else { // pressed one key
            const keyCode = this.activeKeys[0];
            const fnName = this.controlFunctions[keyCode];
            this.circle.move(fnName);
        }
    }



    canEat(subject) {
        const circleOffset = this.circle.element.offset();
        const subjectOffset = subject.offset();
        const y = circleOffset.top;
        const x = circleOffset.left;
        const y1 = subjectOffset.top;
        const x1 = subjectOffset.left;
        const width1 = subject.width();
        const width = this.circle.element.width();
        const height1 = subject.height();
        const height = this.circle.element.height();


        return x1 + width1 >= x &&
            x1 <= x + width &&
            y1 + height1 >= y &&
            y1 <= y + height;
    }

    afterEat(size) {
        if (this.circle.size <= 200) {
            this.circle.size += 20
        }
        if (this.circle.step >= 3) {
            this.circle.step -= 0.5;
        }
        let eat = new Howl({
            src: 'https://freesound.org/data/previews/160/160980_1555579-lq.mp3',
            format: ['mp3', 'aac']
        });
        eat.play()
        this.score++;
        if (this.score === 10) {
            game.end();
        }
    }

    afterEatStar() {
        let eatStar = new Howl({
            src: 'https://freesound.org/data/previews/453/453000_9159316-lq.mp3',
            format: ['mp3', 'aac']
        });
        eatStar.play()
        this.circle.step += 5;
        this.circle.element.addClass("animation");
        setTimeout(() => {
            this.circle.step -= 5;
            this.circle.element.removeClass("animation");
        }, 4000);


    }

    reset() {
        this.circle.element.remove();
        this.score = 0;
        this.initCircle();
    }

    destroy() {
        $(document).off(`keydown.${this.key}`);
        this.circle.stop()
        this.circle.element.remove();
        this.circle = null;
    }

    onCircleMove() {
        if (this.moveListener) {
            this.moveListener()
        }
    }

    onMove(callback) {
        this.moveListener = callback;
    }

}