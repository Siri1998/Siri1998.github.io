class Star {

	constructor() {
        const element = $('<div/>', {
            class: 'star',
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


    destroy() {
        this.element.remove();
    }
}