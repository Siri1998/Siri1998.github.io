class Circle {
	get left() {
		return this._left;
	}

	get top() {
		return this._top;
	}

	set left (x) {
		this._left = x;
		this.element.css({
			left: x
		});
	}

	set top(y) {
		this._top = y;
		this.element.css({
			top: y
		});
	}

	set size(size) {
		this._size = size;
		this.element.css({
			width: size,
			height: size
		});
	}

	get size() {
		return this._size;
	}


	constructor(left, top) {
		this._left = left;
		this._top = top;
		this._size = 50;
		this.score = 0;
		this.step = 20;

		const element = $('<div/>', {
		    class: 'circle',
		});
		this.element = element;
		this.element.appendTo('#games');
		this.left = this._left;
		this.top = this._top;
		this.size = this._size;
	}



	moveRight() {
		this.left += this.step
	}

	moveLeft() {
		this.left -= this.step
	}

	moveUp() {
		this.top -= this.step
	}

	moveDown() {
		this.top += this.step
	}

	canEatGift(gift) {
		const circleOffset = this.element.offset();
		const giftOffset = gift.element.offset();
		const y = circleOffset.top;
		const x = circleOffset.left;
		const y1 = giftOffset.top;
		const x1 = giftOffset.left;
		const width1 = gift.element.width();
		const width = this.element.width();
		const height1 = gift.element.height();
		const height = this.element.height();


		return x1 + width1 >= x &&
			   x1 <= x + width &&
			   y1 + height1 >= y &&
			   y1 <= y + height;
	}

	afterEat() {
		this.size += 20;
		this.step -= 0.5;
	}

	updateScore(){
		this.score +=1;
		 document.getElementById('score').value = this.score;

	}
}



class Gift {

	constructor() {
		const element = $('<div/>', {
		    class: 'gift',
		});

		this.left = _.random(0, window.innerWidth);
		this.top = _.random(0, window.innerHeight);

		this.element = element;
		this.element.css({
			left: this.left,
			top: this.top
		});

		this.element.appendTo('#games');
	}


	destory() {
		this.element.remove();
	}
}


class Game {
	constructor() {
		this.giftLifeTime = 50000;
		this.circle = new Circle(_.random(0, window.innerWidth), _.random(0, window.innerHeight),);
	}


	start() {
		this.initGiftLifeCycle();
		this.initKeyEvents();

	}

	initGiftLifeCycle() {
		this.gift = new Gift();
		setInterval(() => {
			this.gift.destory();
			this.gift = new Gift();
		}, this.giftLifeTime)
	}

	initKeyEvents() {
		$(document).on('keydown', (event) => {
			switch (event.which) {
				case 37:
					this.circle.moveLeft();
					break;
				case 38:
					this.circle.moveUp();
					break;
				case 39:
					this.circle.moveRight();
					break;
				case 40:
					this.circle.moveDown();
					break;
			}

			if(this.circle.canEatGift(this.gift)) {
				this.gift.destory();
				this.gift = new Gift();
				this.circle.afterEat();
				this.circle.updateScore();
			}
		});
	}

	destory() {

	}
}


$(() => {
	$(".btn").click(function() {
	   if($.trim($('#player').val()) == '') {
      		alert('This field cannot be empty');
      	 } else {
      	 	name = $('#player').val()
      	 	$('#user').val(name)  
      	 	$("#reg").hide()
      	 	const game = new Game();
			game.start();
      	 }
	})
	  
});	