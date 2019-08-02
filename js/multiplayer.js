let game = null;

$(() => {
    let sound = new Howl({
        src: 'https://freesound.org/data/previews/335/335571_5942333-lq.mp3',
        format: ['mp3', 'aac'],
        volume: 0.2,
        autoplay: true,
        loop: true,
    });
    sound.play();
    let firstPlayerScore;
    let secondPlayerScore;

    $(".btn").click(function() {
        const firstPlayerName = $.trim($('#player1').val());
        const secondPlayerName = $.trim($('#player2').val());


        if (!firstPlayerName || !secondPlayerName) {
            alert('These fields cannot be empty');
        } else {
            player1 = $('#player1').val();
            player2 = $('#player2').val();
            $('#user1').text(firstPlayerName)
            $('#user2').text(secondPlayerName)
            $("#reg").hide();

            game = new Game();
            game.start()

        }
    })

});