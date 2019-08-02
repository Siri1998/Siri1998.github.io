class Gift {

    constructor() {
        const element = $('<div/>', {
            class: 'gift',
        });

        this.left = _.random(0, (window.innerWidth) - 50);
        this.top = _.random(0, (window.innerHeight) - 50);

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