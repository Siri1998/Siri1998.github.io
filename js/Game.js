class Game {
    constructor() {
        this.starLifeTime = 5000;
        this.isFinished = false;
    }

    start() {
        this.gift = new Gift();
        this.player1 = new Player(1);
        this.player2 = new Player(2, {
            'UP': 87,
            'DOWN': 83,
            'LEFT': 65,
            'RIGHT': 68,
        });
        this.player1.onMove(this.onPlayerMove.bind(this, this.player1, this.player2));
        this.player2.onMove(this.onPlayerMove.bind(this, this.player2, this.player1));
        this.startStarLife();
    }

    end() {
        this.player1.destroy();
        this.player2.destroy();
        this.gift.destroy();
        $(".finish").css({
            "display": "block",
            "opacity": "1"
        })

        $(".container").addClass('finished')
        if (this.player1.score > this.player2.score) {
            $("#win").text(player1)
        } else {
            $("#win").text(player2)
        }
    }

    onPlayerMove(player1, player2) {
        if (player1.canEat(player2.circle.element) && player1.score > player2.score) {
            player2.reset();
            player1.afterEat();
        }

        if (player1.canEat(this.gift.element)) {
            player1.afterEat();
            this.gift.destroy();
            this.gift = new Gift()

        }

        if (this.star && player1.canEat(this.star.element)) {
            player1.afterEatStar();
            this.star.destroy();
        }


        $('#score1').text(this.player1.score)
        $('#score2').text(this.player2.score)


    }


    startStarLife() {
        const time = _.random(5, 8) * 1000
        setTimeout(() => {
            this.star = new Star()
            setTimeout(() => {
                this.star.destroy();
                this.startStarLife();
            }, this.starLifeTime);
        }, time);
    }


}